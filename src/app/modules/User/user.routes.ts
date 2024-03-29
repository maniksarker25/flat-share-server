import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUserValidationSchema),
  userController.registerUser
);

router.post("/login", userController.loginUser);
router.get("/profile", auth(), userController.getUserProfile);
router.put(
  "/profile",
  auth(),
  validateRequest(userValidation.updateUserProfileValidationSchema),
  userController.updateUserProfileIntoDB
);

export const userRoutes = router;
