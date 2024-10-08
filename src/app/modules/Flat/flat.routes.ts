import express from "express";
import { flatController } from "./flat.controller";

import validateRequest from "../../middlewares/validateRequest";
import { flatValidation } from "./flat.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();
router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(flatValidation.createFlatValidationSchema),
  flatController.createFlat
);

router.get("/", flatController.getFlats);
router.get("/my-flats", auth(UserRole.USER), flatController.getMyFlats);
router.get(
  "/:flatId",
  // auth(UserRole.ADMIN, UserRole.USER),
  flatController.getSingleFlat
);
router.put(
  "/:flatId",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(flatValidation.updateFlatValidationSchema),
  flatController.updateFlat
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.USER),
  flatController.deleteFlat
);

export const flatRoutes = router;
