// package: elemental
// file: elemental.proto

var elemental_pb = require("./elemental_pb");
var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Elemental = (function () {
  function Elemental() {}
  Elemental.serviceName = "elemental.Elemental";
  return Elemental;
}());

Elemental.GetElem = {
  methodName: "GetElem",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: elemental_pb.Element
};

Elemental.GetCombination = {
  methodName: "GetCombination",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: elemental_pb.Combination,
  responseType: elemental_pb.CombinationResult
};

Elemental.GetAll = {
  methodName: "GetAll",
  service: Elemental,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: elemental_pb.GetAllChunk
};

Elemental.GetInv = {
  methodName: "GetInv",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: elemental_pb.Inventory
};

Elemental.AddFound = {
  methodName: "AddFound",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: elemental_pb.SuggestionRequest,
  responseType: google_protobuf_empty_pb.Empty
};

Elemental.GetSuggestion = {
  methodName: "GetSuggestion",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: elemental_pb.Suggestion
};

Elemental.GetSuggestionCombos = {
  methodName: "GetSuggestionCombos",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: elemental_pb.Combination,
  responseType: elemental_pb.SuggestionCombinationResponse
};

Elemental.UpSuggestion = {
  methodName: "UpSuggestion",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: elemental_pb.SuggestionRequest,
  responseType: elemental_pb.VoteResponse
};

Elemental.DownSuggestion = {
  methodName: "DownSuggestion",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: elemental_pb.SuggestionRequest,
  responseType: elemental_pb.VoteResponse
};

Elemental.CreateSugg = {
  methodName: "CreateSugg",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: elemental_pb.CreateRequest,
  responseType: google_protobuf_empty_pb.Empty
};

Elemental.NewSugg = {
  methodName: "NewSugg",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: elemental_pb.NewSuggestionRequest,
  responseType: elemental_pb.VoteResponse
};

Elemental.RandomLonely = {
  methodName: "RandomLonely",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: elemental_pb.RandomCombinationResponse
};

Elemental.UpAndComing = {
  methodName: "UpAndComing",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: elemental_pb.RandomCombinationResponse
};

Elemental.GetRec = {
  methodName: "GetRec",
  service: Elemental,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: elemental_pb.Recents
};

Elemental.WaitForNextRecent = {
  methodName: "WaitForNextRecent",
  service: Elemental,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: google_protobuf_empty_pb.Empty
};

exports.Elemental = Elemental;

function ElementalClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ElementalClient.prototype.getElem = function getElem(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.GetElem, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.getCombination = function getCombination(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.GetCombination, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.getAll = function getAll(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Elemental.GetAll, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ElementalClient.prototype.getInv = function getInv(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.GetInv, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.addFound = function addFound(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.AddFound, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.getSuggestion = function getSuggestion(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.GetSuggestion, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.getSuggestionCombos = function getSuggestionCombos(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.GetSuggestionCombos, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.upSuggestion = function upSuggestion(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.UpSuggestion, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.downSuggestion = function downSuggestion(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.DownSuggestion, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.createSugg = function createSugg(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.CreateSugg, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.newSugg = function newSugg(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.NewSugg, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.randomLonely = function randomLonely(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.RandomLonely, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.upAndComing = function upAndComing(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.UpAndComing, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.getRec = function getRec(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elemental.GetRec, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ElementalClient.prototype.waitForNextRecent = function waitForNextRecent(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Elemental.WaitForNextRecent, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.ElementalClient = ElementalClient;

