import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import AppError from "../error/appError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessage = "";
  let errorDetails = {};
  if (err instanceof ZodError) {
    const concatedMessage = err.issues.map((issue, index) => {
      if (index === err.issues.length - 1) {
        return issue.message;
      } else {
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
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;

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
