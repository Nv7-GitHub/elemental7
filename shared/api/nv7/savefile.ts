import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";
import {NV7ElementalAPI} from "./nv7";
import { SuggestionRequest } from "./pb/elemental_pb";

export async function foundElement(api: NV7ElementalAPI, newElement: string): Promise<void> {
  if (!((await api.saveFile.get("found")).includes(newElement))) {
    await new Promise<void>((res, rej) => {
      let req = new SuggestionRequest();
      req.setUid(api.uid);
      req.setElement(newElement);
      api.client.addFound(req, (err, _) => {
        if (err) {
          console.error(err.message);
          rej(err);
        }
        res();
      })
    })
    
    var existing = await api.saveFile.get("found");
    existing.push(newElement);
    await api.saveFile.set("found", existing);
  }
}

export async function getFound(api: NV7ElementalAPI): Promise<string[]> {
  let found = await new Promise<string[]>((res, rej) => {
    let inp = new StringValue();
    inp.setValue(api.uid);
    api.client.getInv(inp, (err, resp) => {
      if (err) {
        console.error(err.message);
        rej(err);
      };

      res(resp.getFoundList());
    })
  });

  await api.saveFile.set("found", found);
  return found;
}
