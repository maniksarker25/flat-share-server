import { Booking } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const createBookingIntoDB = async (userId: string, payload: Booking) => {
  const flat = await prisma.flat.findUnique({
    where: {
      id: payload.flatId,
    },
  });
  if (!flat) {
    throw new AppError(httpStatus.NOT_FOUND, "Flat not found");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const bookingData = {
    userId,
    flatId: payload.flatId,
  };
  const result = await prisma.booking.create({
    data: bookingData,
  });

  return result;
};

export const bookingService = {
  createBookingIntoDB,
};
