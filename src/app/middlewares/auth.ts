import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

import config from "../config";
import httpStatus from "http-status";
import AppError from "../error/appError";
import { jwtHelper } from "../helpers/jwtHelper";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    let decoded;

    try {
      decoded = jwtHelper.verifyToken(
        token,
        config.jwt_access_secret as string
      );
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
