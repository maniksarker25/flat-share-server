"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        flatId: zod_1.z.string({ required_error: "flat id is required" }),
        name: zod_1.z.string({
            required_error: "name is required",
            invalid_type_error: "Name must be a valid string",
        }),
        profession: zod_1.z.string({
            required_error: "Profession is required",
            invalid_type_error: "Profession must be a valid string",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a valid email address",
        }),
    }),
});
const updateBookingFlatApplicationStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string({ required_error: "status is required" }),
    }),
});
exports.bookingValidation = {
    createBookingValidationSchema,
    updateBookingFlatApplicationStatusSchema,
};
