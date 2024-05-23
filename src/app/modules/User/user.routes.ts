import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUserValidationSchema),
  userController.registerUser
);

router.post("/login", userController.loginUser);
router.get("/", auth(UserRole.ADMIN), userController.getAllUser);
router.get("/profile", auth(), userController.getUserProfile);
router.put(
  "/profile",
  auth(),
  // validateRequest(userValidation.updateUserProfileValidationSchema),
  userController.updateUserProfileIntoDB
);

export const userRoutes = router;
