import { ElementalLoadingUi } from "../../elem";
import { Nv7AnarchyAPI } from "./nv7anarchy";

export async function login(api: Nv7AnarchyAPI, ui?: ElementalLoadingUi): Promise<boolean> {
    var email = api.saveFile.get("email", "default")
    var password = api.saveFile.get("password", "default")

    if (email == "default" || password == "default") {
        var registering = false;
        while (true) {
            ui.status("Requesting Login Info", 0);
            let creds = await api.ui.dialog({
                title: 'Nv7 Elemental Login',
                parts: [
                    {
                        id: "email",
                        type: "text",
                        placholder: "MyEpicUsername",
                        required: true,
                    },
                    {
                        id: "password",
                        type: "password",
                        required: true,
                    }
                ],
                buttons: [
                    {
                        id: 1,
                        label: (!registering && "Log In") || (registering && "Register"),
                    },
                    {
                        id: 0,
                        label: (!registering && "Register") || (registering && "Log In"),
                    },
                    !registering && {
                        id: -2,
                        label: "Anonymous"
                    },
                    {
                        id: -1,
                        label: "Cancel",
                    }
                ].filter(Boolean)
            });

            ui.status("Processing Login Info", 0);

            if (creds["button"] == 1) {
                ui.status("Authenticating", 0);

                // Get URL
                let url = api.prefix + "login_user/" + encodeURIComponent(creds["email"]);
                if (registering) {
                    url = api.prefix + "create_user/" + encodeURIComponent(creds["email"]);
                }

                // Get response
                var resp = await fetch(url, {
                    method: "POST",
                    body: creds["password"],
                });
                ui.status("Authenticating", 0.5);
                var data = await resp.json();
                ui.status("Authenticating", 1);

                // Process
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
                        "button": "Ok",
                    });
                    return false;
                }
            } else if (creds["button"] == 0) {
                registering = !registering;
            } else if (creds["button"] == -2) {
                // Get anonymous username
                ui.status("Generating username", 0)
                var resp = await fetch(api.prefix + "new_anonymous_user")
                ui.status("Generating username", 0.5)
                var response = await resp.json();
                ui.status("Generating username", 1)
                if (!response.success) {
                    ui.status("Showing Error", 0);
                    await api.ui.alert({
                        "text": response.data,
                        "title": "Error",
                        "button": "Ok",
                    });
                    return false;
                }

                // Create Account
                ui.status("Creating account", 0);
                const username = response.data;
                resp = await fetch(api.prefix + "create_user/" + encodeURIComponent(username), {
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
                        "button": "Ok",
                    });
                    return false;
                }
            } else if (creds["button"] == -1) {
                return false;
            }
        }
    } else {
        // Use existing creds
        ui.status("Authenticating", 0);
        resp = await fetch(api.prefix + "login_user/" + encodeURIComponent(email), {
            method: "POST",
            body: password,
        });
        ui.status("Authenticating", 0.5);
        data = await resp.json();
        ui.status("Authenticating", 1);
        if (data.success) {
            // Set data
            api.uid = data.data;
            ui.status("Loading Game", 0);
            return true;
        } else {
            // Logout if failure with default creds
            ui.status("Showing Error", 0);
            await api.ui.alert({
                "text": data.data,
                "title": "Error",
                "button": "Ok",
            });
            await api.saveFile.set("email", "default");
            await api.saveFile.set("password", "default");
            await api.ui.reloadSelf();
        }
    }
}