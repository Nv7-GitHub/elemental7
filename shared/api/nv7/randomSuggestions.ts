import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";
import { NV7ElementalAPI } from "./nv7";

export async function randomLonelySugg(api: NV7ElementalAPI): Promise<string[]> {
  try {
    let dat = await new Promise<string[]>((res, rej) => {
      let inp = new StringValue();
      inp.setValue(api.uid);
      api.client.randomLonely(inp, (err, resp) => {
        if (err) {
          api.handleError(err);
          return rej(err);
        }
        res(resp.getElementsList());
      })
    });

    if (dat.length == 0) {
      api.ui.alert({
        title: "Error!",
        text: "No random lonely suggestions!",
      });
    }
    return dat;
  } catch (err) {
    return [];
  }
}


export async function upAndComingSugg(api: NV7ElementalAPI): Promise<string[]> {
  try {
    let dat = await new Promise<string[]>((res, rej) => {
      let inp = new StringValue();
      inp.setValue(api.uid);
      api.client.upAndComing(inp, (err, resp) => {
        if (err) {
          api.handleError(err);
          return rej(err);
        }
        res(resp.getElementsList());
      })
    });

    if (dat.length == 0) {
      api.ui.alert({
        title: "Error!",
        text: "No up and coming suggestions!",
      });
    }
    return dat;
  } catch (err) {
    return [];
  }
}