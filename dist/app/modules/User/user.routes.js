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
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.userController.registerUser);
router.post("/login", user_controller_1.userController.loginUser);
router.get("/profile", (0, auth_1.default)(), user_controller_1.userController.getUserProfile);
router.put("/profile", (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserProfileValidationSchema), user_controller_1.userController.updateUserProfileIntoDB);
exports.userRoutes = router;
