"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        flatId: zod_1.z.string({ required_error: "flat id is required" }),
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
