"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
        bio: zod_1.z.string({
            required_error: "Bio is required",
            invalid_type_error: "Bio must be a string",
        }),
        profession: zod_1.z.string({
            required_error: "Profession is required",
            invalid_type_error: "Profession must be a string",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string",
        }),
    }),
});
const updateUserProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string({ invalid_type_error: "Bio must be a string" }).optional(),
        profession: zod_1.z
            .string({ invalid_type_error: "Profession must be a string" })
            .optional(),
        address: zod_1.z
            .string({ invalid_type_error: "Address must be a string" })
            .optional(),
    }),
});
exports.userValidation = {
    createUserValidationSchema,
    updateUserProfileValidationSchema,
};
