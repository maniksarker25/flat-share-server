import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await userService.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    // meta: result?.meta,
    // data: result?.data,
    data: result,
  });
});

export const userController = {
  registerUser,
};
