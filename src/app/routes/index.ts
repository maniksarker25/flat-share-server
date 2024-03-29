import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { flatRoutes } from "../modules/Flat/flat.routes";
import { bookingRoutes } from "../modules/Booking/booking.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: flatRoutes,
  },
  {
    path: "/",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
