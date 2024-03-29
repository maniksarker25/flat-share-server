import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking requests submitted successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
};
