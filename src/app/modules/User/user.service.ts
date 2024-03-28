import { User } from "@prisma/client";

const registerUserIntoDB = async (payload: User) => {
  console.log("resetting");
};

export const userService = {
  registerUserIntoDB,
};
