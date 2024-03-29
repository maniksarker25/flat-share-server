import express from "express";
import { flatController } from "./flat.controller";

const router = express.Router();

router.post("/flats", flatController.createFlat);

export const flatRoutes = router;
