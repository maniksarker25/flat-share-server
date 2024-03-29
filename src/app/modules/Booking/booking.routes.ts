import express from "express";
import auth from "../../middlewares/auth";
import { bookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/booking-applications",
  auth(),
  validateRequest(bookingValidation.createBookingValidationSchema),
  bookingController.createBooking
);

export const bookingRoutes = router;
