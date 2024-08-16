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
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

// get user profile
const getUserProfile = catchAsync(async (req, res) => {
  console.log("user", req?.user);
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

// get all user
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

// change user status
const changeUserStatus = catchAsync(async (req, res) => {
  const { userId } = req?.params;
  const { status } = req.body;
  const result = await userService.changeUserStatusIntoDB(userId, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated  successfully",
    data: result,
  });
});
// change user role
const changeUserRole = catchAsync(async (req, res) => {
  const { userId } = req?.params;
  const { role } = req.body;
  const result = await userService.changeUserRoleIntoDB(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated  successfully",
    data: result,
  });
});
// change password
const changePassword = catchAsync(async (req, res) => {
  const userId = req?.user?.id;
  const result = await userService.changePasswordIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});
// Update profile
const updateProfile = catchAsync(async (req, res) => {
  const userId = req?.user?.id;
  const result = await userService.updateProfileIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const userController = {
  registerUser,
  loginUser,
  getAllUser,
  getUserProfile,
  updateUserProfileIntoDB,
  changeUserStatus,
  changeUserRole,
  changePassword,
  updateProfile,
};
