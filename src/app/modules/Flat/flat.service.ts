import { Flat } from "@prisma/client";
import prisma from "../../utils/prisma";

const createFlatIntoDB = async (payload: Flat) => {
  const result = await prisma.flat.create({
    data: payload,
  });

  return result;
};

export const flatService = {
  createFlatIntoDB,
};
