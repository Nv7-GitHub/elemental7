import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import {RecentCombination} from "../../elem";
import { NV7ElementalAPI } from "./nv7";
import { Recents } from "./pb/elemental_pb";

export async function getRecents(api: NV7ElementalAPI): Promise<RecentCombination[]> {
  let data = await new Promise<Recents>((res, rej) => {
    api.client.getRec(new Empty(), (err, resp) => {
      if (err) {
        api.handleError(err);
        return rej(err);
      }
      res(resp);
    })
  });
  
  return data.getRecentsList().map((val) => {
    return {
      recipe: [val.getElem1(), val.getElem2()],
      result: val.getElem3(),
    }
  });
}

export async function waitForNew(api: NV7ElementalAPI): Promise<void> {
  api.ref = api.client.waitForNextRecent(new Empty());
  return new Promise<void>((res, _) => {
    api.ref.on("data", (_) => {
      res();
    });
  });
}
