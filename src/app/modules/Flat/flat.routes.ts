import express from "express";
import { flatController } from "./flat.controller";

import validateRequest from "../../middlewares/validateRequest";
import { flatValidation } from "./flat.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/flats",
  auth(),
  validateRequest(flatValidation.createFlatValidationSchema),
  flatController.createFlat
);

router.get("/flats", auth(), flatController.getFlats);

export const flatRoutes = router;
