import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { metaServices } from "./meta.services";
import sendResponse from "../../utils/sendResponse";

const getMetaData = catchAsync(async (req, res) => {
  const result = await metaServices.getMetaDataForProfile(req?.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meta data retrieved successfully",
    data: result,
  });
});

export const metaControllers = {
  getMetaData,
};
