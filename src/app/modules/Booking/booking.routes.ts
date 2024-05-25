import express from "express";
import auth from "../../middlewares/auth";
import { bookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(bookingValidation.createBookingValidationSchema),
  bookingController.createBooking
);
router.get(
  "/my-booking-requests",
  auth(UserRole.USER),
  bookingController.getMyBookingRequests
);
router.put(
  "/:bookingId",
  auth(),
  validateRequest(bookingValidation.updateBookingFlatApplicationStatusSchema),
  bookingController.updateBookingFlatApplicationStatus
);
export const bookingRoutes = router;
