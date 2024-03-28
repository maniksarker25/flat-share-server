import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { User, UserProfile } from "@prisma/client";
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

export const userService = {
  registerUserIntoDB,
};
