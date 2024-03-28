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
  // make userProfile data
  const userProfileData = {
    bio: payload.bio,
    profession: payload.profession,
    address: payload.address,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    userProfileData.userId = createdUserData.id;
    const createdProfileData = await transactionClient.userProfile.create({
      data: userProfileData,
    });
    return createdUserData;
  });
  return result;
};

export const userService = {
  registerUserIntoDB,
};
