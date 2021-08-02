import {Suggestion, SuggestionRequest, SuggestionResponse} from "../../elem";
import {SuggestionData} from "./types";
import { NV7ElementalAPI } from "./nv7";
import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";
import { E4ColorPalette } from "../../elemental4-types";
import { Color, Combination, CreateRequest, NewSuggestionRequest, Suggestion as Sugg, SuggestionRequest as SuggestionReq } from "./pb/elemental_pb";
import { ServiceError } from "./pb/elemental_pb_service";

async function getSuggestionCombo(api: NV7ElementalAPI, elem1: string, elem2: string): Promise<string[]> {
  let suggestions = await new Promise<string[]>((res, rej) => {
    let combo = new Combination();
    combo.setElem1(elem1);
    combo.setElem2(elem2);
    api.client.getSuggestionCombos(combo, (err, resp) => {
      if (err) {
        console.error(err.message);
        rej(err);
      }

      res(resp.getSuggestionsList());
    });
  })
  if (suggestions == null) {
    suggestions = [];
  }
  return suggestions
}

export async function getSuggests(api: NV7ElementalAPI, elem1: string, elem2: string): Promise<Suggestion<"dynamic-elemental4">[]>{
  var suggestions = await getSuggestionCombo(api, elem1, elem2);

  var output: Suggestion<"dynamic-elemental4">[] = [];
  for (var val in suggestions) {
    var data = await getSuggestion(api, suggestions[val])
    output.push({
      text: data.name,
      color: data.color
    });
  }

  return output;
}

async function getSuggestion(api: NV7ElementalAPI, id: string): Promise<SuggestionData> {
  let data = await new Promise<SuggestionData>((res, rej) => {
    let inp = new StringValue();
    inp.setValue(id);
    api.client.getSuggestion(inp, (err, resp) => {
      if (err) {
        if (err.message == "null") {
          return res(null);
        }
        api.handleError(err);
        return rej(err);
      }

      res({
        name: resp.getName(),
        creator: resp.getCreator(),
        color: {
          base: resp.getColor().getBase() as E4ColorPalette,
          saturation: resp.getColor().getSaturation(),
          lightness: resp.getColor().getLightness(),
        },
        votes: resp.getVotes(),
        voted: resp.getVotedList(),
      });
    })
  })
  if (data == null) {
    return null;
  }
  return data;
}

export async function downSuggestion(request: SuggestionRequest<"dynamic-elemental4">, api: NV7ElementalAPI): Promise<void> {
  var id = request.text;
  return new Promise<void>((res, rej) => {
    let req = new SuggestionReq();
    req.setElement(id);
    req.setUid(api.uid);
    api.client.upSuggestion(req, async (err, resp) => {
      if (err) {
        await api.ui.alert({
          "text": err.message,
          "title": "Error",
          "button": "Ok",
        });
        return rej(err);
      }

      res();
    });
  });
}

async function handleCreate(api: NV7ElementalAPI, createProm: Promise<boolean>, parents: string[], id: string): Promise<SuggestionResponse> {
  let create = false;
  try {
    create = await createProm;
  } catch (err) {
    await api.ui.alert({
      "text": text,
      "title": err.message,
      "button": "Ok",
    });
    return {
      suggestType: "failed"
    }
  }

  if (create) {
    let commentData = await api.ui.prompt({
      title: "Confirm Creator Mark",
      text: "Enter below what you want to use for your creator mark. You are responsible for the creation of this element!"
    });
    var comment = "No comment."
    if (commentData) {
      comment = commentData;
    }
    let err = await new Promise<ServiceError>((res, _) => {
      let req = new CreateRequest();
      req.setPioneer(api.saveFile.get("email", "anonymous"));
      req.setElem1(parents[0]);
      req.setElem2(parents[1]);
      req.setId(id);
      req.setMark(comment);
      api.client.createSugg(req, (err, _) => {
        res(err);
      })
    });

    if (err) {
      await api.ui.alert({
        "text": err.message,
        "title": "Error",
        "button": "Ok",
      });
      return {
        suggestType: "failed"
      }
    }

    return {
      suggestType: "vote",
      newElements: [id]
    }
  }
  return {
    suggestType: "vote"
  }
}

async function upvoteSuggestion(id: string, api: NV7ElementalAPI, parents: string[]): Promise<SuggestionResponse> {
  return handleCreate(api, new Promise<boolean>((res, rej) => {
    let req = new SuggestionReq();
    req.setElement(id);
    req.setUid(api.uid);
    api.client.upSuggestion(req, (err, resp) => {
      if (err) {
        return rej(err);
      }

      res(resp.getCreate());
    });
  }), parents, id);
}

export async function newSuggestion(elem1: string, elem2: string, request: SuggestionRequest<"dynamic-elemental4">, api: NV7ElementalAPI): Promise<SuggestionResponse> {
  var existing = await getSuggestionCombo(api, elem1, elem2);
  
  for (let exists of existing) {
    if (exists == request.text) {
      return upvoteSuggestion(exists, api, [elem1, elem2]);
    }
  }

  return handleCreate(api, new Promise<boolean>((res, rej) => {
    let col = new Color();
    col.setBase(request.color.base);
    col.setSaturation(request.color.saturation);
    col.setLightness(request.color.lightness);

    let newSuggest = new Sugg();
    newSuggest.setName(request.text);
    newSuggest.setCreator(api.saveFile.get("email", "anonymous"));
    newSuggest.setColor(col);
    newSuggest.setVotes(0);
    newSuggest.setVotedList([api.uid]);

    let req = new NewSuggestionRequest();
    req.setElem1(elem1);
    req.setElem2(elem2);
    req.setSuggestion(newSuggest);
    
    api.client.newSugg(req, (err, resp) => {
      if (err) {
        return rej(err);
      }

      res(resp.getCreate());
    });
  }), [elem1, elem2], request.text);
}
