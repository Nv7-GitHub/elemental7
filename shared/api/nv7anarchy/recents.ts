import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { RecentCombination } from "../../elem";
import { Nv7AnarchyAPI } from "./nv7anarchy";
import { AnarchyRecents } from "./pb/anarchy_pb";

export async function getRecents(api: Nv7AnarchyAPI): Promise<RecentCombination[]> {
    let data = await new Promise<AnarchyRecents>((res, rej) => {
        api.client.getRecents(new Empty(), (err, resp) => {
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

export async function waitForNew(api: Nv7AnarchyAPI): Promise<void> {
    api.ref = api.client.waitForNextRecent(new Empty());
    return new Promise<void>((res, _) => {
        api.ref.on("data", (_) => {
            res();
        });
    });
}