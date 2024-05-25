import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    flatId: z.string({ required_error: "flat id is required" }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a valid email address",
    }),
  }),
});

const updateBookingFlatApplicationStatusSchema = z.object({
  body: z.object({
    status: z.string({ required_error: "status is required" }),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
  updateBookingFlatApplicationStatusSchema,
};
