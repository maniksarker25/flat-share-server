import express from "express";
import auth from "../../middlewares/auth";
import { bookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(bookingValidation.createBookingValidationSchema),
  bookingController.createBooking
);
router.get("/", auth(), bookingController.getBookingRequests);
router.put(
  "/:bookingId",
  auth(),
  validateRequest(bookingValidation.updateBookingFlatApplicationStatusSchema),
  bookingController.updateBookingFlatApplicationStatus
);
export const bookingRoutes = router;
