import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { flatService } from "./flat.service";
import pick from "../../utils/pick";
import { flatFilterableFields } from "./flat.constant";

const createFlat = catchAsync(async (req, res) => {
  const userId = req?.user?.id;
  const result = await flatService.createFlatIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Flat added successfully",
    data: result,
  });
});

// get flats

const getFlats = catchAsync(async (req, res) => {
  const filters = pick(req.query, flatFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await flatService.getFlatsFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flats retrieved successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// update flat
const updateFlat = catchAsync(async (req, res) => {
  const flatId = req.params.flatId;
  const result = await flatService.updateFlatIntoDB(flatId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat information updated successfully",
    data: result,
  });
});

// get single flat
const getSingleFlat = catchAsync(async (req, res) => {
  const flatId = req.params.flatId;
  const result = await flatService.getSingleFlatFromDB(flatId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat information retrieved successfully",
    data: result,
  });
});
// delete flat
const deleteFlat = catchAsync(async (req, res) => {
  const flatId = req?.params?.id;
  const result = await flatService.deleteFlatFromDB(flatId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat deleted  successfully",
    data: result,
  });
});

export const flatController = {
  createFlat,
  getFlats,
  getSingleFlat,
  updateFlat,
  deleteFlat,
};
