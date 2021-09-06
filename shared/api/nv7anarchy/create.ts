import { SuggestionRequest, SuggestionResponse } from "../../elem";
import { Nv7AnarchyAPI } from "./nv7anarchy";
import { AnarchyElementCreate } from "./pb/anarchy_pb";

export async function createElement(api: Nv7AnarchyAPI, elem1: string, elem2: string, sugg: SuggestionRequest<"dynamic-elemental4">): Promise<SuggestionResponse> {
    let commentData = await api.ui.prompt({
        title: "Confirm Creator Mark",
        text: "Enter below what you want to use for your creator mark. You are responsible for the creation of this element!"
    });
    var comment = "No comment."
    if (commentData) {
        comment = commentData;
    }

    let req = new AnarchyElementCreate();
    req.setElem1(elem1);
    req.setElem2(elem2);
    req.setElem3(sugg.text);
    req.setUid(api.uid);
    req.setColor(sugg.color.base + "_" + sugg.color.saturation + "_" + sugg.color.lightness);
    req.setComment(comment);

    return new Promise<SuggestionResponse>((res, rej) => {
        api.client.createElement(req, (err, resp) => {
            if (err) {
                api.handleError(err);
                res({ suggestType: 'failed' });
            } else {
                res({
                    suggestType: "vote",
                    newElements: [sugg.text]
                });
            }
        });
    })
}