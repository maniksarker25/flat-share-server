import { BookingStatus, UserRole } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import prisma from "../../utils/prisma";

const getMetaDataForProfile = async (user: JwtPayload) => {
  let metaData;
  switch (user?.role) {
    case UserRole.USER:
      metaData = await getUserMetaData(user);
      break;
    case UserRole.ADMIN:
      metaData = await getAdminMetaData(user);
      break;
    default:
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid user role");
  }
  console.log(metaData);
  return metaData;
};

const getUserMetaData = async (user: JwtPayload) => {
  const totalFlat = await prisma.flat.count({
    where: {
      userId: user?.id,
    },
  });
  const totalRequest = await prisma.booking.count({
    where: {
      userId: user?.id,
    },
  });
  const totalBooked = await prisma.booking.count({
    where: {
      userId: user?.id,
      status: BookingStatus.APPROVED,
    },
  });
  return { totalFlat, totalRequest, totalBooked };
};

const getAdminMetaData = async (user: JwtPayload) => {
  const totalUser = await prisma.user.count();
  const totalFlat = await prisma.flat.count();
  const totalRequest = await prisma.booking.count({
    where: {
      status: BookingStatus.PENDING,
    },
  });
  return { totalUser, totalFlat, totalRequest };
};

export const metaServices = {
  getMetaDataForProfile,
};
