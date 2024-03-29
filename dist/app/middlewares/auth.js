"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config"));
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../error/appError"));
const jwtHelper_1 = require("../helpers/jwtHelper");
const auth = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        let decoded;
        try {
            decoded = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt_access_secret);
        }
        catch (err) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        if (!decoded) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
