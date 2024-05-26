"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.userController.registerUser);
router.post("/login", user_controller_1.userController.loginUser);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.getAllUser);
router.get("/profile", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), user_controller_1.userController.getUserProfile);
router.put("/profile", (0, auth_1.default)(), 
// validateRequest(userValidation.updateUserProfileValidationSchema),
user_controller_1.userController.updateUserProfileIntoDB);
router.patch("/change-status/:userId", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.changeUserStatus);
router.patch("/change-role/:userId", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.changeUserRole);
router.post("/change-password", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.userController.changePassword);
router.patch("/update-profile", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.userController.updateProfile);
exports.userRoutes = router;
