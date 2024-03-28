import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
const registerUserIntoDB = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  // make user data
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    const createdProfileData = await transactionClient.userProfile.create({
      data: payload,
    });
    return createdUserData;
  });
  return result;
};

export const userService = {
  registerUserIntoDB,
};
