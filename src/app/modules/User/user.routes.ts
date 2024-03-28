import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUserValidationSchema),
  userController.registerUser
);

router.post("/login", userController.loginUser);

export const userRoutes = router;
