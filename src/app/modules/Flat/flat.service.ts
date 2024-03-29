import { Flat, Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import { TPaginationOptions } from "../../interface/pagination.interface";
import { TFlatFilterableFields } from "./flat.interface";
import { calculatePagination } from "../../helpers/paginatonHelper";
import { flatSearchableFields } from "./flat.constant";
import AppError from "../../error/appError";
import httpStatus from "http-status";

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
  // destructure limit and skip
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = query;
  console.log(searchTerm);
  // make a default and condition-------
  const andConditions: Prisma.FlatWhereInput[] = [];

  // if searchTerm is exists in query
  if (query?.searchTerm) {
    andConditions.push({
      OR: flatSearchableFields.map((field) => ({
        [field]: {
          contains: query?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // make queries for filter data
  if (Object.keys(filterData)?.length > 0) {
    andConditions.push({
      AND: Object.keys(filterData)?.map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.FlatWhereInput = { AND: andConditions };
  // console.dir(whereConditions, { depth: "infinity" });
  const result = await prisma.flat.findMany({
    where: whereConditions,
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
  const total = await prisma.flat.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update flat into db
const updateFlatIntoDB = async (flatId: string, payload: Partial<Flat>) => {
  const flat = await prisma.flat.findUnique({
    where: {
      id: flatId,
    },
  });
  if (!flat) {
    throw new AppError(httpStatus.NOT_FOUND, "Flat not found");
  }
  const result = await prisma.flat.update({
    where: {
      id: flatId,
    },
    data: payload,
  });

  return result;
};
export const flatService = {
  createFlatIntoDB,
  getFlatsFromDB,
  updateFlatIntoDB,
};
