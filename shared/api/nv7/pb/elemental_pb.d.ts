// package: elemental
// file: elemental.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Suggestion extends jspb.Message {
  getCreator(): string;
  setCreator(value: string): void;

  getName(): string;
  setName(value: string): void;

  getVotes(): number;
  setVotes(value: number): void;

  hasColor(): boolean;
  clearColor(): void;
  getColor(): Color | undefined;
  setColor(value?: Color): void;

  clearVotedList(): void;
  getVotedList(): Array<string>;
  setVotedList(value: Array<string>): void;
  addVoted(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Suggestion.AsObject;
  static toObject(includeInstance: boolean, msg: Suggestion): Suggestion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Suggestion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Suggestion;
  static deserializeBinaryFromReader(message: Suggestion, reader: jspb.BinaryReader): Suggestion;
}

export namespace Suggestion {
  export type AsObject = {
    creator: string,
    name: string,
    votes: number,
    color?: Color.AsObject,
    votedList: Array<string>,
  }
}

export class Color extends jspb.Message {
  getBase(): string;
  setBase(value: string): void;

  getLightness(): number;
  setLightness(value: number): void;

  getSaturation(): number;
  setSaturation(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Color.AsObject;
  static toObject(includeInstance: boolean, msg: Color): Color.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Color, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Color;
  static deserializeBinaryFromReader(message: Color, reader: jspb.BinaryReader): Color;
}

export namespace Color {
  export type AsObject = {
    base: string,
    lightness: number,
    saturation: number,
  }
}

export class Combination extends jspb.Message {
  getElem1(): string;
  setElem1(value: string): void;

  getElem2(): string;
  setElem2(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Combination.AsObject;
  static toObject(includeInstance: boolean, msg: Combination): Combination.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Combination, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Combination;
  static deserializeBinaryFromReader(message: Combination, reader: jspb.BinaryReader): Combination;
}

export namespace Combination {
  export type AsObject = {
    elem1: string,
    elem2: string,
  }
}

export class CombinationResult extends jspb.Message {
  getData(): string;
  setData(value: string): void;

  getExists(): boolean;
  setExists(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CombinationResult.AsObject;
  static toObject(includeInstance: boolean, msg: CombinationResult): CombinationResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CombinationResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CombinationResult;
  static deserializeBinaryFromReader(message: CombinationResult, reader: jspb.BinaryReader): CombinationResult;
}

export namespace CombinationResult {
  export type AsObject = {
    data: string,
    exists: boolean,
  }
}

export class Element extends jspb.Message {
  getColor(): string;
  setColor(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  getCreatedon(): number;
  setCreatedon(value: number): void;

  getCreator(): string;
  setCreator(value: string): void;

  getName(): string;
  setName(value: string): void;

  clearParentsList(): void;
  getParentsList(): Array<string>;
  setParentsList(value: Array<string>): void;
  addParents(value: string, index?: number): string;

  getPioneer(): string;
  setPioneer(value: string): void;

  getUses(): number;
  setUses(value: number): void;

  getFoundby(): number;
  setFoundby(value: number): void;

  getComplexity(): number;
  setComplexity(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Element.AsObject;
  static toObject(includeInstance: boolean, msg: Element): Element.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Element, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Element;
  static deserializeBinaryFromReader(message: Element, reader: jspb.BinaryReader): Element;
}

export namespace Element {
  export type AsObject = {
    color: string,
    comment: string,
    createdon: number,
    creator: string,
    name: string,
    parentsList: Array<string>,
    pioneer: string,
    uses: number,
    foundby: number,
    complexity: number,
  }
}

export class Inventory extends jspb.Message {
  clearFoundList(): void;
  getFoundList(): Array<string>;
  setFoundList(value: Array<string>): void;
  addFound(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Inventory.AsObject;
  static toObject(includeInstance: boolean, msg: Inventory): Inventory.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Inventory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Inventory;
  static deserializeBinaryFromReader(message: Inventory, reader: jspb.BinaryReader): Inventory;
}

export namespace Inventory {
  export type AsObject = {
    foundList: Array<string>,
  }
}

export class SuggestionRequest extends jspb.Message {
  getUid(): string;
  setUid(value: string): void;

  getElement(): string;
  setElement(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SuggestionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SuggestionRequest): SuggestionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SuggestionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SuggestionRequest;
  static deserializeBinaryFromReader(message: SuggestionRequest, reader: jspb.BinaryReader): SuggestionRequest;
}

export namespace SuggestionRequest {
  export type AsObject = {
    uid: string,
    element: string,
  }
}

export class SuggestionCombinationResponse extends jspb.Message {
  clearSuggestionsList(): void;
  getSuggestionsList(): Array<string>;
  setSuggestionsList(value: Array<string>): void;
  addSuggestions(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SuggestionCombinationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SuggestionCombinationResponse): SuggestionCombinationResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SuggestionCombinationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SuggestionCombinationResponse;
  static deserializeBinaryFromReader(message: SuggestionCombinationResponse, reader: jspb.BinaryReader): SuggestionCombinationResponse;
}

export namespace SuggestionCombinationResponse {
  export type AsObject = {
    suggestionsList: Array<string>,
  }
}

export class VoteResponse extends jspb.Message {
  getCreate(): boolean;
  setCreate(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VoteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VoteResponse): VoteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VoteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VoteResponse;
  static deserializeBinaryFromReader(message: VoteResponse, reader: jspb.BinaryReader): VoteResponse;
}

export namespace VoteResponse {
  export type AsObject = {
    create: boolean,
  }
}

export class CreateRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getElem1(): string;
  setElem1(value: string): void;

  getElem2(): string;
  setElem2(value: string): void;

  getMark(): string;
  setMark(value: string): void;

  getPioneer(): string;
  setPioneer(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    id: string,
    elem1: string,
    elem2: string,
    mark: string,
    pioneer: string,
  }
}

export class NewSuggestionRequest extends jspb.Message {
  getElem1(): string;
  setElem1(value: string): void;

  getElem2(): string;
  setElem2(value: string): void;

  hasSuggestion(): boolean;
  clearSuggestion(): void;
  getSuggestion(): Suggestion | undefined;
  setSuggestion(value?: Suggestion): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSuggestionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewSuggestionRequest): NewSuggestionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewSuggestionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSuggestionRequest;
  static deserializeBinaryFromReader(message: NewSuggestionRequest, reader: jspb.BinaryReader): NewSuggestionRequest;
}

export namespace NewSuggestionRequest {
  export type AsObject = {
    elem1: string,
    elem2: string,
    suggestion?: Suggestion.AsObject,
  }
}

export class RandomCombinationResponse extends jspb.Message {
  clearElementsList(): void;
  getElementsList(): Array<string>;
  setElementsList(value: Array<string>): void;
  addElements(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RandomCombinationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RandomCombinationResponse): RandomCombinationResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RandomCombinationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RandomCombinationResponse;
  static deserializeBinaryFromReader(message: RandomCombinationResponse, reader: jspb.BinaryReader): RandomCombinationResponse;
}

export namespace RandomCombinationResponse {
  export type AsObject = {
    elementsList: Array<string>,
  }
}

export class GetAllChunk extends jspb.Message {
  clearElementsList(): void;
  getElementsList(): Array<Element>;
  setElementsList(value: Array<Element>): void;
  addElements(value?: Element, index?: number): Element;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllChunk.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllChunk): GetAllChunk.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllChunk, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllChunk;
  static deserializeBinaryFromReader(message: GetAllChunk, reader: jspb.BinaryReader): GetAllChunk;
}

export namespace GetAllChunk {
  export type AsObject = {
    elementsList: Array<Element.AsObject>,
    count: number,
  }
}

export class RecentCombination extends jspb.Message {
  getElem1(): string;
  setElem1(value: string): void;

  getElem2(): string;
  setElem2(value: string): void;

  getElem3(): string;
  setElem3(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecentCombination.AsObject;
  static toObject(includeInstance: boolean, msg: RecentCombination): RecentCombination.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecentCombination, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecentCombination;
  static deserializeBinaryFromReader(message: RecentCombination, reader: jspb.BinaryReader): RecentCombination;
}

export namespace RecentCombination {
  export type AsObject = {
    elem1: string,
    elem2: string,
    elem3: string,
  }
}

export class Recents extends jspb.Message {
  clearRecentsList(): void;
  getRecentsList(): Array<RecentCombination>;
  setRecentsList(value: Array<RecentCombination>): void;
  addRecents(value?: RecentCombination, index?: number): RecentCombination;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Recents.AsObject;
  static toObject(includeInstance: boolean, msg: Recents): Recents.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Recents, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Recents;
  static deserializeBinaryFromReader(message: Recents, reader: jspb.BinaryReader): Recents;
}

export namespace Recents {
  export type AsObject = {
    recentsList: Array<RecentCombination.AsObject>,
  }
}

