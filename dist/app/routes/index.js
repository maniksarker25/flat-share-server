"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const flat_routes_1 = require("../modules/Flat/flat.routes");
const booking_routes_1 = require("../modules/Booking/booking.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/flat",
        route: flat_routes_1.flatRoutes,
    },
    {
        path: "/booking-request",
        route: booking_routes_1.bookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
