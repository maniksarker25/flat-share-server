import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { flatRoutes } from "../modules/Flat/flat.routes";
import { bookingRoutes } from "../modules/Booking/booking.routes";
import { metaRoutes } from "../modules/Meta/meta.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/flat",
    route: flatRoutes,
  },
  {
    path: "/booking-request",
    route: bookingRoutes,
  },
  {
    path: "/meta",
    route: metaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
