// package: elemental
// file: elemental.proto

import * as elemental_pb from "./elemental_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ElementalGetElem = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof elemental_pb.Element;
};

type ElementalGetCombination = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof elemental_pb.Combination;
  readonly responseType: typeof elemental_pb.CombinationResult;
};

type ElementalGetAll = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof elemental_pb.GetAllChunk;
};

type ElementalGetInv = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof elemental_pb.Inventory;
};

type ElementalAddFound = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof elemental_pb.SuggestionRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type ElementalGetSuggestion = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof elemental_pb.Suggestion;
};

type ElementalGetSuggestionCombos = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof elemental_pb.Combination;
  readonly responseType: typeof elemental_pb.SuggestionCombinationResponse;
};

type ElementalUpSuggestion = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof elemental_pb.SuggestionRequest;
  readonly responseType: typeof elemental_pb.VoteResponse;
};

type ElementalDownSuggestion = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof elemental_pb.SuggestionRequest;
  readonly responseType: typeof elemental_pb.VoteResponse;
};

type ElementalCreateSugg = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof elemental_pb.CreateRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type ElementalNewSugg = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof elemental_pb.NewSuggestionRequest;
  readonly responseType: typeof elemental_pb.VoteResponse;
};

type ElementalRandomLonely = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof elemental_pb.RandomCombinationResponse;
};

type ElementalUpAndComing = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof elemental_pb.RandomCombinationResponse;
};

type ElementalGetRec = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof elemental_pb.Recents;
};

type ElementalWaitForNextRecent = {
  readonly methodName: string;
  readonly service: typeof Elemental;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

export class Elemental {
  static readonly serviceName: string;
  static readonly GetElem: ElementalGetElem;
  static readonly GetCombination: ElementalGetCombination;
  static readonly GetAll: ElementalGetAll;
  static readonly GetInv: ElementalGetInv;
  static readonly AddFound: ElementalAddFound;
  static readonly GetSuggestion: ElementalGetSuggestion;
  static readonly GetSuggestionCombos: ElementalGetSuggestionCombos;
  static readonly UpSuggestion: ElementalUpSuggestion;
  static readonly DownSuggestion: ElementalDownSuggestion;
  static readonly CreateSugg: ElementalCreateSugg;
  static readonly NewSugg: ElementalNewSugg;
  static readonly RandomLonely: ElementalRandomLonely;
  static readonly UpAndComing: ElementalUpAndComing;
  static readonly GetRec: ElementalGetRec;
  static readonly WaitForNextRecent: ElementalWaitForNextRecent;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ElementalClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getElem(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Element|null) => void
  ): UnaryResponse;
  getElem(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Element|null) => void
  ): UnaryResponse;
  getCombination(
    requestMessage: elemental_pb.Combination,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.CombinationResult|null) => void
  ): UnaryResponse;
  getCombination(
    requestMessage: elemental_pb.Combination,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.CombinationResult|null) => void
  ): UnaryResponse;
  getAll(requestMessage: google_protobuf_wrappers_pb.StringValue, metadata?: grpc.Metadata): ResponseStream<elemental_pb.GetAllChunk>;
  getInv(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Inventory|null) => void
  ): UnaryResponse;
  getInv(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Inventory|null) => void
  ): UnaryResponse;
  addFound(
    requestMessage: elemental_pb.SuggestionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  addFound(
    requestMessage: elemental_pb.SuggestionRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getSuggestion(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Suggestion|null) => void
  ): UnaryResponse;
  getSuggestion(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Suggestion|null) => void
  ): UnaryResponse;
  getSuggestionCombos(
    requestMessage: elemental_pb.Combination,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.SuggestionCombinationResponse|null) => void
  ): UnaryResponse;
  getSuggestionCombos(
    requestMessage: elemental_pb.Combination,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.SuggestionCombinationResponse|null) => void
  ): UnaryResponse;
  upSuggestion(
    requestMessage: elemental_pb.SuggestionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.VoteResponse|null) => void
  ): UnaryResponse;
  upSuggestion(
    requestMessage: elemental_pb.SuggestionRequest,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.VoteResponse|null) => void
  ): UnaryResponse;
  downSuggestion(
    requestMessage: elemental_pb.SuggestionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.VoteResponse|null) => void
  ): UnaryResponse;
  downSuggestion(
    requestMessage: elemental_pb.SuggestionRequest,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.VoteResponse|null) => void
  ): UnaryResponse;
  createSugg(
    requestMessage: elemental_pb.CreateRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  createSugg(
    requestMessage: elemental_pb.CreateRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  newSugg(
    requestMessage: elemental_pb.NewSuggestionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.VoteResponse|null) => void
  ): UnaryResponse;
  newSugg(
    requestMessage: elemental_pb.NewSuggestionRequest,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.VoteResponse|null) => void
  ): UnaryResponse;
  randomLonely(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.RandomCombinationResponse|null) => void
  ): UnaryResponse;
  randomLonely(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.RandomCombinationResponse|null) => void
  ): UnaryResponse;
  upAndComing(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.RandomCombinationResponse|null) => void
  ): UnaryResponse;
  upAndComing(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.RandomCombinationResponse|null) => void
  ): UnaryResponse;
  getRec(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Recents|null) => void
  ): UnaryResponse;
  getRec(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: elemental_pb.Recents|null) => void
  ): UnaryResponse;
  waitForNextRecent(requestMessage: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata): ResponseStream<google_protobuf_empty_pb.Empty>;
}

