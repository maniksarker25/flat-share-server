"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const registerUserIntoDB = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield prisma_1.default.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (isUserExists) {
      throw new appError_1.default(
        http_status_1.default.BAD_REQUEST,
        "This user already exists"
      );
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    // make user data
    // const userData = {
    //   name: payload.name,
    //   email: payload.email,
    //   password: hashedPassword,
    // };
    // make userProfile data
    // const userProfileData = {
    //   bio: payload.bio,
    //   profession: payload.profession,
    //   address: payload.address,
    // };
    // const result = await prisma.$transaction(async (transactionClient) => {
    //   const createdUserData = await transactionClient.user.create({
    //     data: userData,
    //     select: {
    //       id: true,
    //       name: true,
    //       email: true,
    //       createdAt: true,
    //       updatedAt: true,
    //     },
    //   });
    //   const createdProfileData = await transactionClient.userProfile.create({
    //     data: { userId: createdUserData?.id, ...userProfileData },
    //   });
    //   return createdUserData;
    // });
    payload.password = hashedPassword;
    const result = yield prisma_1.default.user.create({
      data: payload,
    });
    return result;
  });
// login user into db
const loginUserIntoDB = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
      where: {
        email: payload.email,
        status: client_1.UserStatus.ACTIVE,
      },
    });
    if (!user) {
      throw new appError_1.default(
        http_status_1.default.NOT_FOUND,
        "User not found"
      );
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(
      payload === null || payload === void 0 ? void 0 : payload.password,
      user === null || user === void 0 ? void 0 : user.password
    );
    if (!isPasswordMatched) {
      throw new appError_1.default(
        http_status_1.default.FORBIDDEN,
        "Password does not matched"
      );
    }
    const jwtPayload = {
      id: user.id,
      email: user === null || user === void 0 ? void 0 : user.email,
      role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = jwtHelper_1.jwtHelper.generateToken(
      jwtPayload,
      config_1.default.jwt_access_secret,
      config_1.default.jwt_access_expires_in
    );
    console.log("accessToken", accessToken);
    return {
      token: accessToken,
    };
  });
// get all user from db
const getAllUserFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany();
    return result;
  });
//get user profile
const getUserProfileFromDB = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
        role: true,
      },
    });
    return result;
  });
// update user profile
const updateUserProfileIntoDB = (userId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userProfile.update({
      where: {
        userId,
      },
      data: payload,
    });
    return result;
  });
// change user status
const changeUserStatusIntoDB = (userId, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userInfo) {
      throw new appError_1.default(
        http_status_1.default.NOT_FOUND,
        "User not found"
      );
    }
    const result = yield prisma_1.default.user.update({
      where: {
        id: userId,
      },
      data: {
        status: status,
      },
    });
    return result;
  });
// change user role
const changeUserRoleIntoDB = (userId, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userInfo) {
      throw new appError_1.default(
        http_status_1.default.NOT_FOUND,
        "User not found"
      );
    }
    const result = yield prisma_1.default.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });
    return result;
  });
// change password
const changePasswordIntoDB = (userId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userInfo) {
      throw new appError_1.default(
        http_status_1.default.NOT_FOUND,
        "User not found"
      );
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(
      payload === null || payload === void 0 ? void 0 : payload.currentPassword,
      userInfo === null || userInfo === void 0 ? void 0 : userInfo.password
    );
    if (!isPasswordMatched) {
      throw new appError_1.default(
        http_status_1.default.FORBIDDEN,
        "Password does not matched"
      );
    }
    const hashedPassword = yield bcrypt_1.default.hash(
      payload === null || payload === void 0 ? void 0 : payload.newPassword,
      12
    );
    yield prisma_1.default.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    return null;
  });
// edit profile
const updateProfileIntoDB = (userId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userInfo) {
      throw new appError_1.default(
        http_status_1.default.NOT_FOUND,
        "User does not exist"
      );
    }
    const result = yield prisma_1.default.user.update({
      where: {
        id: userId,
      },
      data: payload,
    });
    return result;
  });
exports.userService = {
  registerUserIntoDB,
  loginUserIntoDB,
  getAllUserFromDB,
  getUserProfileFromDB,
  updateUserProfileIntoDB,
  changeUserStatusIntoDB,
  changeUserRoleIntoDB,
  changePasswordIntoDB,
  updateProfileIntoDB,
};
