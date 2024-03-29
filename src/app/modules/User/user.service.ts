import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { User, UserProfile } from "@prisma/client";
import { TLoginUser } from "./user.interface";
import config from "../../config";
import { jwtHelper } from "../../helpers/jwtHelper";
import AppError from "../../error/appError";
import httpStatus from "http-status";
const registerUserIntoDB = async (payload: User & UserProfile) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  // make user data
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  };
  // make userProfile data
  const userProfileData = {
    bio: payload.bio,
    profession: payload.profession,
    address: payload.address,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const createdProfileData = await transactionClient.userProfile.create({
      data: { userId: createdUserData?.id, ...userProfileData },
    });
    return createdUserData;
  });
  return result;
};

// login user into db
const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not matched");
  }

  const jwtPayload = {
    id: user.id,
    email: user?.email,
  };
  const accessToken = jwtHelper.generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

//get user profile
const getUserProfileFromDB = async (userId: string) => {
  const result = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  return result;
};

// update user profile
const updateUserProfileIntoDB = async (
  userId: string,
  payload: Partial<UserProfile>
) => {
  const result = await prisma.userProfile.update({
    where: {
      userId,
    },
    data: payload,
  });

  return result;
};

export const userService = {
  registerUserIntoDB,
  loginUserIntoDB,
  getUserProfileFromDB,
  updateUserProfileIntoDB,
};
