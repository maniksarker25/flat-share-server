import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await userService.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// login user
const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

// get user profile
const getUserProfile = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await userService.getUserProfileFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

/// update user profile into db
const updateUserProfileIntoDB = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await userService.updateUserProfileIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const userController = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfileIntoDB,
};
