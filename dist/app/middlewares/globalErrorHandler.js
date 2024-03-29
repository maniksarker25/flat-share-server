"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const appError_1 = __importDefault(require("../error/appError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessage = "";
    let errorDetails = {};
    if (err instanceof zod_1.ZodError) {
        const concatedMessage = err.issues.map((issue, index) => {
            if (index === err.issues.length - 1) {
                return issue.message;
            }
            else {
                return issue.message + ".";
            }
        });
        message = concatedMessage.join(" ") + ".";
        errorDetails = {
            issues: err.issues.map((issue) => ({
                field: issue.path[1],
                message: issue.message,
            })),
        };
    }
    else if (err instanceof appError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err;
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message,
        errorDetails,
    });
};
exports.default = globalErrorHandler;
// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";
// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//     success: false,
//     message: err.message || "Something went wrong",
//     error: err,
//   });
// };
// export default globalErrorHandler;
