"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: "User name is required",
            invalid_type_error: "User name must be a string",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
    }),
});
// const updateUserProfileValidationSchema = z.object({
//   body: z.object({
//     bio: z.string({ invalid_type_error: "Bio must be a string" }).optional(),
//     profession: z
//       .string({ invalid_type_error: "Profession must be a string" })
//       .optional(),
//     address: z
//       .string({ invalid_type_error: "Address must be a string" })
//       .optional(),
//   }),
// });
exports.userValidation = {
    createUserValidationSchema,
    // updateUserProfileValidationSchema,
};
