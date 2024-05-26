"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.createBookingValidationSchema), booking_controller_1.bookingController.createBooking);
router.get("/my-booking-requests", (0, auth_1.default)(client_1.UserRole.USER), booking_controller_1.bookingController.getMyBookingRequests);
router.put("/:bookingId", (0, auth_1.default)(), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.updateBookingFlatApplicationStatusSchema), booking_controller_1.bookingController.updateBookingFlatApplicationStatus);
exports.bookingRoutes = router;
