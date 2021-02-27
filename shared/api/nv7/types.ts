import {DynamicColor} from "../../elemental4-types";

export interface Element {
    name: string,
    color: string,
    createdOn: number,
    creator: string,
    pioneer: string,
    comment: string,
    parents: string[],
    uses: number,
    foundby: number,
}

export interface SuggestionData {
    name: string,
    creator: string,
    color: DynamicColor,
    votes: number,
    voted: string[]
}
