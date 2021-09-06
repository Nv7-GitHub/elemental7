import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";
import { Elem, ElementalLoadingUi } from "../../elem";
import { Nv7AnarchyAPI } from "./nv7anarchy";
import { AnarchyCombination, AnarchyCombinationResult, AnarchyElement, AnarchyGetAllChunk } from "./pb/anarchy_pb";
import { ServiceError } from "./pb/anarchy_pb_service";
import { getFound } from "./savefile";
import { Element } from "./types";

export async function getElem(api: Nv7AnarchyAPI, id: string): Promise<Elem> {
    var elemData: Element = api.elemCache[id];
    if (!(id in api.elemCache)) {
        elemData = await api.cache.get(id);
        if (!elemData) {
            elemData = await new Promise<Element>((res, rej) => {
                let inp = new StringValue();
                inp.setValue(id);
                api.client.getElem(inp, (err, resp) => {
                    if (err) {
                        api.handleError(err);
                        return rej(err);;
                    }

                    res(gElement2Element(resp))
                })
            })
            await api.cache.store(elemData);
        }
    }

    return {
        id: elemData.name,
        display: {
            text: elemData.name,
            color: elemData.color,
            categoryName: elemData.color.split("_")[0]
        },
        createdOn: elemData.createdOn,
        stats: {
            creators: [elemData.creator],
            comments: [
                {
                    author: elemData.creator,
                    comment: elemData.comment
                }
            ],
            simplestRecipe: elemData.parents,
            usageCount: elemData.uses,
            discoveries: elemData.foundby,
            treeComplexity: elemData.complexity,
        },
    };
}

export async function downloadElems(api: Nv7AnarchyAPI, ui: ElementalLoadingUi) {
    ui.status("Getting Database Date");
    let downloadTime = api.saveFile.get("downloadTime", 0);
    let needsDownload = (Date.now() - (downloadTime * 1000)) > (60 * 60 * 24 * 7) // A week since last downloaded

    if (!needsDownload) {
        await loadElems(api, ui);

        ui.status("Loading Savefile", 0)
        let found = await getFound(api);
        needsDownload = ((found.length + 30) - Object.keys(api.elemCache).length) > 50
    } else {
        api.saveFile.set("downloadTime", Math.floor(Date.now() / 1000))
    }

    if (needsDownload) {
        ui.status("Connecting To Server", 0);
        await new Promise<void>((res, _) => {
            var finished = 0;

            let inp = new StringValue();
            inp.setValue(api.uid);
            let stream = api.client.getAll(inp);
            stream.on("data", async (chunk: AnarchyGetAllChunk) => {
                let elems = chunk.getElementsList().map(gElement2Element);
                let total = chunk.getCount();
                finished += elems.length / 2;
                ui.status("Downloading Elements", finished / total);

                await api.cache.storeAll(elems);
                finished += elems.length / 2;
                ui.status("Downloading Elements", finished / total);

                if (finished == total) {
                    res();
                }
            });
        });

        await loadElems(api, ui);
    }
}

export async function getCombination(api: Nv7AnarchyAPI, elem1: string, elem2: string): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      let inp = new AnarchyCombination();
      inp.setElem1(elem1);
      inp.setElem2(elem2);
      api.client.getCombination(inp, (err: ServiceError, resp: AnarchyCombinationResult) => {
        if (err) {
          api.handleError(err);
          resolve([]);
        }
  
        if (!resp.getExists()) {
          resolve([]);
        }
  
        resolve([resp.getData()]);
      });
    })
  }

async function loadElems(api: Nv7AnarchyAPI, ui: ElementalLoadingUi): Promise<void> {
    ui.status("Reading Elements", 0);
    var i: any;
    let elems = await api.cache.getAllElements();
    ui.status("Reading Elements", 0.5);
    for (i in elems) {
        api.elemCache[elems[i].name] = elems[i];
        ui.status("Reading Elements", 0.5 + (i + 1 / elems.length / 2));
    }
    return;
}


function gElement2Element(elem: AnarchyElement): Element {
    return {
        name: elem.getName(),
        color: elem.getColor(),
        createdOn: elem.getCreatedon(),
        creator: elem.getCreator(),
        comment: elem.getComment(),
        parents: elem.getParentsList(),
        uses: elem.getUses(),
        foundby: elem.getFoundby(),
        complexity: elem.getComplexity(),
    }
}