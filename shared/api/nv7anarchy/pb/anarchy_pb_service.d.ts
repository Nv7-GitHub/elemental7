// package: anarchy
// file: anarchy.proto

import * as anarchy_pb from "./anarchy_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AnarchyGetElem = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof anarchy_pb.AnarchyElement;
};

type AnarchyGetCombination = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof anarchy_pb.AnarchyCombination;
  readonly responseType: typeof anarchy_pb.AnarchyCombinationResult;
};

type AnarchyGetAll = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof anarchy_pb.AnarchyGetAllChunk;
};

type AnarchyCreateElement = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof anarchy_pb.AnarchyElementCreate;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type AnarchyGetInv = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.StringValue;
  readonly responseType: typeof anarchy_pb.AnarchyInventory;
};

type AnarchyAddFound = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof anarchy_pb.AnarchyUserRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type AnarchyGetRecents = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof anarchy_pb.AnarchyRecents;
};

type AnarchyWaitForNextRecent = {
  readonly methodName: string;
  readonly service: typeof Anarchy;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

export class Anarchy {
  static readonly serviceName: string;
  static readonly GetElem: AnarchyGetElem;
  static readonly GetCombination: AnarchyGetCombination;
  static readonly GetAll: AnarchyGetAll;
  static readonly CreateElement: AnarchyCreateElement;
  static readonly GetInv: AnarchyGetInv;
  static readonly AddFound: AnarchyAddFound;
  static readonly GetRecents: AnarchyGetRecents;
  static readonly WaitForNextRecent: AnarchyWaitForNextRecent;
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

export class AnarchyClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getElem(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyElement|null) => void
  ): UnaryResponse;
  getElem(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyElement|null) => void
  ): UnaryResponse;
  getCombination(
    requestMessage: anarchy_pb.AnarchyCombination,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyCombinationResult|null) => void
  ): UnaryResponse;
  getCombination(
    requestMessage: anarchy_pb.AnarchyCombination,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyCombinationResult|null) => void
  ): UnaryResponse;
  getAll(requestMessage: google_protobuf_wrappers_pb.StringValue, metadata?: grpc.Metadata): ResponseStream<anarchy_pb.AnarchyGetAllChunk>;
  createElement(
    requestMessage: anarchy_pb.AnarchyElementCreate,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  createElement(
    requestMessage: anarchy_pb.AnarchyElementCreate,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getInv(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyInventory|null) => void
  ): UnaryResponse;
  getInv(
    requestMessage: google_protobuf_wrappers_pb.StringValue,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyInventory|null) => void
  ): UnaryResponse;
  addFound(
    requestMessage: anarchy_pb.AnarchyUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  addFound(
    requestMessage: anarchy_pb.AnarchyUserRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getRecents(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyRecents|null) => void
  ): UnaryResponse;
  getRecents(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: anarchy_pb.AnarchyRecents|null) => void
  ): UnaryResponse;
  waitForNextRecent(requestMessage: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata): ResponseStream<google_protobuf_empty_pb.Empty>;
}

