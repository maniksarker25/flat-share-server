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

router.get("/flats", flatController.getFlats);
router.get("/flats/:flatId", flatController.getSingleFlat);
router.put(
  "/flats/:flatId",
  auth(),
  validateRequest(flatValidation.updateFlatValidationSchema),
  flatController.updateFlat
);

router.delete("/flats/:id", flatController.deleteFlat);

export const flatRoutes = router;
