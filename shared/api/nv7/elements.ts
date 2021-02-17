import {Element} from "./types";
import {Elem, ElementalLoadingUi} from "../../elem";
import { NV7ElementalAPI } from "./nv7";

export async function getElem(api: NV7ElementalAPI, id: string): Promise<Elem> {
  var elemData: Element = api.elemCache[id];
  if (!(id in api.elemCache)) {
    elemData = await api.cache.get(id);
    if (!elemData) {
      var req = await fetch(api.prefix + "get_elem/" + encodeURIComponent(id));
      elemData = await req.json();
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
      creators: [elemData.creator, elemData.pioneer],
      comments: [
        {
          author: elemData.pioneer,
          comment: elemData.comment
        }
      ],
      simplestRecipe: elemData.parents
    }
  };
}

export async function getCombination(api: NV7ElementalAPI, elem1: string, elem2: string): Promise<string[]> {
  const comboResp = await fetch(api.prefix + "get_combo/" + encodeURIComponent(elem1) + "/" + encodeURIComponent(elem2))
  let comboData = await comboResp.json()
  if (!comboData.exists) {
    return [];
  }
  return [comboData.combo];
}

export async function downloadElems(api: NV7ElementalAPI, ui: ElementalLoadingUi) {
  ui.status("Downloading Elements", 0)
  var resp = await fetch(api.prefix + "get_all/" + api.uid);
  ui.status("Downloading Elements", 0.5);
  var dat: Element[] = await resp.json();

  await api.cache.storeAll(dat, ui, "Saving Elements");
}
