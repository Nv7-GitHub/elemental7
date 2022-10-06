import { ElementalLoadingUi} from "../../elem";
import { Nv7SingleAPI } from "./nv7single";

export async function login(api: Nv7SingleAPI, ui?: ElementalLoadingUi): Promise<boolean> {
  var email = api.saveFile.get("email", "default")
  var password = api.saveFile.get("password", "default")
  if (email == "default" || password == "default") {
    var registering = false;
    while (true) {
      ui.status("Requesting Login Info", 0);
      let creds = await api.ui.dialog({
        title: 'Nv7 Anarchy Login',
        parts: [
          {
            id: "email",
            type: "text",
            placeholder: "MyEpicUsername",
          },
          {
            id: "password",
            type: "password",
          }
        ],
        buttons: [
          {
            id: "1",
            label: (!registering && "Log In") || (registering && "Register"),
          },
          {
            id: "0",
            label: (!registering && "Register") || (registering && "Log In"),
          },
          !registering && {
            id: "-2",
            label: "Anonymous"
          },
          {
            id: "-1",
            label: "Cancel",
          }
        ].filter(Boolean)
      });

      ui.status("Processing Login Info", 0);

      console.log(creds["button"])
      if (creds["button"] == "1") {
        ui.status("Authenticating", 0);
        let url = api.loginprefix + "login_user/" + encodeURIComponent(creds["email"]);
        if (registering) {
          url = api.loginprefix + "create_user/" + encodeURIComponent(creds["email"]);
        }
        resp = await fetch(url, {
          method: "POST",
          body: creds["password"],
        });

        ui.status("Authenticating", 0.5);
        var data = await resp.json();
        ui.status("Authenticating", 1);

        if (data.success == true) {
          api.uid = data.data;
          api.saveFile.set("email", creds["email"])
          api.saveFile.set("password", creds["password"])
          ui.status("Loading Game", 0);
          return true;
        } else {
          ui.status("Showing Error", 0);
          await api.ui.alert({
            "text": data.data,
            "title": "Error",
          });
          return false;
        }
      } else if (creds["button"] == "0") {
        registering = !registering;
      } else if (creds["button"] == "-2") {
        ui.status("Generating username", 0)
        var resp = await fetch(api.loginprefix + "new_anonymous_user")
        ui.status("Generating username", 0.5)
        var response = await resp.json();
        ui.status("Generating username", 1)
        if (!response.success) {
          ui.status("Showing Error", 0);
          await api.ui.alert({
            "text": response.data,
            "title": "Error",
          });
          return false;
        }
        ui.status("Creating account", 0);
        const username = response.data;
        resp = await fetch(api.loginprefix + "create_user/" + encodeURIComponent(username), {
          method: "POST",
          body: "password",
        });
        ui.status("Creating account", 0.5);
        response = await resp.json();
        ui.status("Creating account", 1);
        if (response.success == true) {
          api.uid = response.data;
          api.saveFile.set("email", username)
          api.saveFile.set("password", "password")
          ui.status("Loading Game", 0);
          return true;
        } else {
          ui.status("Showing Error", 0);
          await api.ui.alert({
            "text": data.data,
            "title": "Error",
          });
          return false;
        }
      } else if (creds["button"] == "-1") {
        return false;
      }
    }
  } else {
    ui.status("Authenticating", 0);
    resp = await fetch(api.loginprefix + "login_user/" + encodeURIComponent(email), {
      method: "POST",
      body: password,
    });
    ui.status("Authenticating", 0.5);
    data = await resp.json();
    ui.status("Authenticating", 1);
    if (data.success) {
      api.uid = data.data;
      ui.status("Loading Game", 0);
      return true;
    } else {
      ui.status("Showing Error", 0);
      await api.ui.alert({
        "text": data.data,
        "title": "Error",
      });
      api.saveFile.set("email", "default");
      api.saveFile.set("password", "default");
      await api.ui.reloadSelf();
    }
  }
}
