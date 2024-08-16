import express from "express";
import { metaControllers } from "./meta.controllers";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  metaControllers.getMetaData
);

export const metaRoutes = router;
