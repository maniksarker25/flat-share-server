import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { flatService } from "./flat.service";

const createFlat = catchAsync(async (req, res) => {
  console.log("cnie");
  const result = await flatService.createFlatIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Flat created successfully",
    data: result,
  });
});

export const flatController = {
  createFlat,
};
