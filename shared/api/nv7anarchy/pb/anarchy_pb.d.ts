// package: anarchy
// file: anarchy.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class AnarchyElement extends jspb.Message {
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

  getUses(): number;
  setUses(value: number): void;

  getFoundby(): number;
  setFoundby(value: number): void;

  getComplexity(): number;
  setComplexity(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyElement.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyElement): AnarchyElement.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyElement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyElement;
  static deserializeBinaryFromReader(message: AnarchyElement, reader: jspb.BinaryReader): AnarchyElement;
}

export namespace AnarchyElement {
  export type AsObject = {
    color: string,
    comment: string,
    createdon: number,
    creator: string,
    name: string,
    parentsList: Array<string>,
    uses: number,
    foundby: number,
    complexity: number,
  }
}

export class AnarchyCombination extends jspb.Message {
  getElem1(): string;
  setElem1(value: string): void;

  getElem2(): string;
  setElem2(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyCombination.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyCombination): AnarchyCombination.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyCombination, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyCombination;
  static deserializeBinaryFromReader(message: AnarchyCombination, reader: jspb.BinaryReader): AnarchyCombination;
}

export namespace AnarchyCombination {
  export type AsObject = {
    elem1: string,
    elem2: string,
  }
}

export class AnarchyCombinationResult extends jspb.Message {
  getData(): string;
  setData(value: string): void;

  getExists(): boolean;
  setExists(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyCombinationResult.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyCombinationResult): AnarchyCombinationResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyCombinationResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyCombinationResult;
  static deserializeBinaryFromReader(message: AnarchyCombinationResult, reader: jspb.BinaryReader): AnarchyCombinationResult;
}

export namespace AnarchyCombinationResult {
  export type AsObject = {
    data: string,
    exists: boolean,
  }
}

export class AnarchyInventory extends jspb.Message {
  clearFoundList(): void;
  getFoundList(): Array<string>;
  setFoundList(value: Array<string>): void;
  addFound(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyInventory.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyInventory): AnarchyInventory.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyInventory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyInventory;
  static deserializeBinaryFromReader(message: AnarchyInventory, reader: jspb.BinaryReader): AnarchyInventory;
}

export namespace AnarchyInventory {
  export type AsObject = {
    foundList: Array<string>,
  }
}

export class AnarchyUserRequest extends jspb.Message {
  getUid(): string;
  setUid(value: string): void;

  getElement(): string;
  setElement(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyUserRequest): AnarchyUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyUserRequest;
  static deserializeBinaryFromReader(message: AnarchyUserRequest, reader: jspb.BinaryReader): AnarchyUserRequest;
}

export namespace AnarchyUserRequest {
  export type AsObject = {
    uid: string,
    element: string,
  }
}

export class AnarchyGetAllChunk extends jspb.Message {
  clearElementsList(): void;
  getElementsList(): Array<AnarchyElement>;
  setElementsList(value: Array<AnarchyElement>): void;
  addElements(value?: AnarchyElement, index?: number): AnarchyElement;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyGetAllChunk.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyGetAllChunk): AnarchyGetAllChunk.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyGetAllChunk, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyGetAllChunk;
  static deserializeBinaryFromReader(message: AnarchyGetAllChunk, reader: jspb.BinaryReader): AnarchyGetAllChunk;
}

export namespace AnarchyGetAllChunk {
  export type AsObject = {
    elementsList: Array<AnarchyElement.AsObject>,
    count: number,
  }
}

export class AnarchyRecentCombination extends jspb.Message {
  getElem1(): string;
  setElem1(value: string): void;

  getElem2(): string;
  setElem2(value: string): void;

  getElem3(): string;
  setElem3(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyRecentCombination.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyRecentCombination): AnarchyRecentCombination.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyRecentCombination, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyRecentCombination;
  static deserializeBinaryFromReader(message: AnarchyRecentCombination, reader: jspb.BinaryReader): AnarchyRecentCombination;
}

export namespace AnarchyRecentCombination {
  export type AsObject = {
    elem1: string,
    elem2: string,
    elem3: string,
  }
}

export class AnarchyRecents extends jspb.Message {
  clearRecentsList(): void;
  getRecentsList(): Array<AnarchyRecentCombination>;
  setRecentsList(value: Array<AnarchyRecentCombination>): void;
  addRecents(value?: AnarchyRecentCombination, index?: number): AnarchyRecentCombination;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyRecents.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyRecents): AnarchyRecents.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyRecents, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyRecents;
  static deserializeBinaryFromReader(message: AnarchyRecents, reader: jspb.BinaryReader): AnarchyRecents;
}

export namespace AnarchyRecents {
  export type AsObject = {
    recentsList: Array<AnarchyRecentCombination.AsObject>,
  }
}

export class AnarchyElementCreate extends jspb.Message {
  getElem1(): string;
  setElem1(value: string): void;

  getElem2(): string;
  setElem2(value: string): void;

  getElem3(): string;
  setElem3(value: string): void;

  getUid(): string;
  setUid(value: string): void;

  getColor(): string;
  setColor(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnarchyElementCreate.AsObject;
  static toObject(includeInstance: boolean, msg: AnarchyElementCreate): AnarchyElementCreate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnarchyElementCreate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnarchyElementCreate;
  static deserializeBinaryFromReader(message: AnarchyElementCreate, reader: jspb.BinaryReader): AnarchyElementCreate;
}

export namespace AnarchyElementCreate {
  export type AsObject = {
    elem1: string,
    elem2: string,
    elem3: string,
    uid: string,
    color: string,
    comment: string,
  }
}

