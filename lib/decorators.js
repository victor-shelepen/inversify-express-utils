"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var constants_1 = require("./constants");
exports.injectHttpContext = inversify_1.inject(constants_1.TYPE.HttpContext);
function controller(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return function (target) {
        var currentMetadata = {
            middleware: middleware,
            path: path,
            target: target
        };
        inversify_1.decorate(inversify_1.injectable(), target);
        Reflect.defineMetadata(constants_1.METADATA_KEY.controller, currentMetadata, target);
        // We need to create an array that contains the metadata of all
        // the controllers in the application, the metadata cannot be
        // attached to a controller. It needs to be attached to a global
        // We attach metadata to the Reflect object itself to avoid
        // declaring additonal globals. Also, the Reflect is avaiable
        // in both node and web browsers.
        var previousMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controller, Reflect) || [];
        var newMetadata = [currentMetadata].concat(previousMetadata);
        Reflect.defineMetadata(constants_1.METADATA_KEY.controller, newMetadata, Reflect);
    };
}
exports.controller = controller;
function all(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return httpMethod.apply(void 0, ["all", path].concat(middleware));
}
exports.all = all;
function httpGet(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return httpMethod.apply(void 0, ["get", path].concat(middleware));
}
exports.httpGet = httpGet;
function httpPost(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return httpMethod.apply(void 0, ["post", path].concat(middleware));
}
exports.httpPost = httpPost;
function httpPut(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return httpMethod.apply(void 0, ["put", path].concat(middleware));
}
exports.httpPut = httpPut;
function httpPatch(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return httpMethod.apply(void 0, ["patch", path].concat(middleware));
}
exports.httpPatch = httpPatch;
function httpHead(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return httpMethod.apply(void 0, ["head", path].concat(middleware));
}
exports.httpHead = httpHead;
function httpDelete(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return httpMethod.apply(void 0, ["delete", path].concat(middleware));
}
exports.httpDelete = httpDelete;
function httpMethod(method, path) {
    var middleware = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        middleware[_i - 2] = arguments[_i];
    }
    return function (target, key, value) {
        var metadata = {
            key: key,
            method: method,
            middleware: middleware,
            path: path,
            target: target
        };
        var metadataList = [];
        if (!Reflect.hasMetadata(constants_1.METADATA_KEY.controllerMethod, target.constructor)) {
            Reflect.defineMetadata(constants_1.METADATA_KEY.controllerMethod, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(constants_1.METADATA_KEY.controllerMethod, target.constructor);
        }
        metadataList.push(metadata);
    };
}
exports.httpMethod = httpMethod;
exports.request = paramDecoratorFactory(constants_1.PARAMETER_TYPE.REQUEST);
exports.response = paramDecoratorFactory(constants_1.PARAMETER_TYPE.RESPONSE);
exports.requestParam = paramDecoratorFactory(constants_1.PARAMETER_TYPE.PARAMS);
exports.queryParam = paramDecoratorFactory(constants_1.PARAMETER_TYPE.QUERY);
exports.requestBody = paramDecoratorFactory(constants_1.PARAMETER_TYPE.BODY);
exports.requestHeaders = paramDecoratorFactory(constants_1.PARAMETER_TYPE.HEADERS);
exports.cookies = paramDecoratorFactory(constants_1.PARAMETER_TYPE.COOKIES);
exports.next = paramDecoratorFactory(constants_1.PARAMETER_TYPE.NEXT);
exports.principal = paramDecoratorFactory(constants_1.PARAMETER_TYPE.PRINCIPAL);
function paramDecoratorFactory(parameterType) {
    return function (name) {
        return params(parameterType, name);
    };
}
function params(type, parameterName) {
    return function (target, methodName, index) {
        var metadataList = {};
        var parameterMetadataList = [];
        var parameterMetadata = {
            index: index,
            injectRoot: parameterName === undefined,
            parameterName: parameterName,
            type: type
        };
        if (!Reflect.hasMetadata(constants_1.METADATA_KEY.controllerParameter, target.constructor)) {
            parameterMetadataList.unshift(parameterMetadata);
        }
        else {
            metadataList = Reflect.getMetadata(constants_1.METADATA_KEY.controllerParameter, target.constructor);
            if (metadataList.hasOwnProperty(methodName)) {
                parameterMetadataList = metadataList[methodName];
            }
            parameterMetadataList.unshift(parameterMetadata);
        }
        metadataList[methodName] = parameterMetadataList;
        Reflect.defineMetadata(constants_1.METADATA_KEY.controllerParameter, metadataList, target.constructor);
    };
}
exports.params = params;
function isAuthenticated(pass) {
    if (pass === void 0) { pass = true; }
    return function (target, key, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function (_request, _response, _next) {
            return __awaiter(this, void 0, void 0, function () {
                var context, _isAuthenticated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = Reflect.getMetadata(constants_1.METADATA_KEY.httpContext, _request);
                            return [4 /*yield*/, context.user.isAuthenticated()];
                        case 1:
                            _isAuthenticated = (_a.sent());
                            if (_isAuthenticated && pass) {
                                return [2 /*return*/, fn.call(this, _request, _response)];
                            }
                            else {
                                _response
                                    .status(403)
                                    .send({ error: "The user is not authenticated." });
                                return [2 /*return*/, _response];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return descriptor;
    };
}
exports.isAuthenticated = isAuthenticated;
