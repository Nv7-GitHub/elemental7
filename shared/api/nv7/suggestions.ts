import {Suggestion, SuggestionRequest, SuggestionResponse, RecentCombination} from "../../elem";
import {SuggestionData} from "./types";
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/firestore';
import { NV7ElementalAPI } from "./nv7";
import { Element } from "./types";

async function getSuggestionCombo(api: NV7ElementalAPI, elem1: string, elem2: string): Promise<string[]> {
  let resp = await fetch(api.prefix + "suggestion_combos/" + encodeURIComponent(elem1) + "/" + encodeURIComponent(elem2))
  let suggestions = await resp.json() as string[];
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
  let resp = await fetch(api.prefix + "get_suggestion/" + encodeURIComponent(id));
  let data = await resp.json() as SuggestionData;
  if (data == null) {
    return null;
  }
  return data;
}

export async function downSuggestion(elem1: string, elem2: string, request: SuggestionRequest<"dynamic-elemental4">, api: NV7ElementalAPI): Promise<void> {
  var id = request.text;
  let resp = await fetch(api.prefix  + "down_suggestion/" + id + "/" + api.uid);
  var text = await resp.text();
  if (text != "") {
    await api.ui.alert({
      "text": text,
      "title": "Error",
      "button": "Ok",
    });
  }
}

async function upvoteSuggestion(id: string, api: NV7ElementalAPI, request: SuggestionRequest<"dynamic-elemental4">, parents: string[]): Promise<SuggestionResponse> {
  var existing: SuggestionData = await getSuggestion(api, id);

  if (!existing.voted) {
    existing.voted = []
  }

  if (existing.voted.includes(api.uid)) {
    await api.ui.alert({
      title: "Already Voted",
      text: "You already voted!"
    })
    return {
      suggestType: "already-added"
    }
  }

  existing.votes++;

  if (existing.votes > api.votesRequired) {
    await firebase.database().ref("/suggestions/" + id).remove();
    await firebase.database().ref("/suggestionMap/" + parents[0] + "/" + parents[1]).remove();

    let commentData = await api.ui.prompt({
      title: "Confirm Creator Mark",
      text: "Enter below what you want to use for your creator mark. You are responsible for the creation of this element!"
    });
    var comment = "No comment."
    if (commentData) {
      comment = commentData;
    }

    // Created element
    var element: Element = {
      name: request.text,
      color: existing.color.base + "_" + existing.color.saturation + "_" + existing.color.lightness,
      creator: existing.creator,
      pioneer: api.saveFile.get("email", "anonymous"),
      parents: parents,
      comment: comment,
      createdOn: new Date().getTime()
    }
    // New Recent Combination
    var recCombo: RecentCombination = {
      recipe: parents as [string, string],
      result: request.text,
    }

    var existingCombos: RecentCombination[] = await api.getRecentCombinations(30);
    if (!existingCombos) {
      existingCombos = [];
    }
    existingCombos.push(recCombo);
    await firebase.database().ref("/recent/").update(existingCombos);

    // Create Element
    await firebase.firestore().collection("elements").doc(element.name).set(element);

    return new Promise<SuggestionResponse>(async (resolve, reject) => {
      firebase.firestore().collection("combos").doc(parents[0]).get().then(async (snapshot) => {
        var data = snapshot.data();
        if (!data) {
          data = {};
        }
        data[parents[1]] = element.name;
        await firebase.firestore().collection("combos").doc(parents[0]).set(data);
        resolve({
          suggestType: "vote",
          newElements: [element.name]
        })
      })
    })
  }

  existing.voted.push(api.uid);

  return new Promise<SuggestionResponse>(async (resolve, reject) => {
    await firebase.database().ref("/suggestions/" + id).update(existing).catch(async (error) => {
      api.ui.status("Showing Error", 0);
      await api.ui.alert({
        "text": error.message,
        "title": "Error",
        "button": "Ok",
      });
      resolve({
        suggestType: 'failed'
      })
    }).then(() => {
      resolve({
        suggestType: 'vote'
      })
    })
  })
}

export async function newSuggestion(elem1: string, elem2: string, request: SuggestionRequest<"dynamic-elemental4">, api: NV7ElementalAPI): Promise<SuggestionResponse> {
  var existing = await getSuggestionCombo(api, elem1, elem2);
  
  for (var i = 0; i < existing.length; i++) {
    if (existing[i] == request.text) {
      return upvoteSuggestion(existing[i], api, request, [elem1, elem2]);
    }
  }

  var newSuggest: SuggestionData = {
    name: request.text,
    creator: api.saveFile.get("email", "anonymous"),
    color: request.color,
    votes: 0,
    voted: [api.uid]
  }

  await firebase.database().ref("/suggestions/" + newSuggest.name).set(newSuggest);

  return new Promise<SuggestionResponse>(async (resolve, reject) => {
    firebase.database().ref("/suggestionMap/" + elem1 + "/" + elem2).once("value").then(async (snapshot) => {
      var data = snapshot.val();
      if (!data) {
        data = [];
      }
      data.push(newSuggest.name);
      await firebase.database().ref("/suggestionMap/" + elem1 + "/" + elem2).set(data);

      resolve({
        suggestType: "suggest"
      })
    });
  })
}
