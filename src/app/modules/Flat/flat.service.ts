import { Flat } from "@prisma/client";
import prisma from "../../utils/prisma";
import { TPaginationOptions } from "../../interface/pagination.interface";
import { TFlatFilterableFields } from "./flat.interface";
import { calculatePagination } from "../../helpers/paginatonHelper";

const createFlatIntoDB = async (payload: Flat) => {
  const result = await prisma.flat.create({
    data: payload,
  });

  return result;
};

const getFlatsFromDB = async (
  query: TFlatFilterableFields,
  options: TPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const result = await prisma.flat.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options?.sortOrder
        ? {
            [options?.sortBy]: options?.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  return result;
};

export const flatService = {
  createFlatIntoDB,
  getFlatsFromDB,
};
