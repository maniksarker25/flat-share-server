import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    flatId: z.string({ required_error: "flat id is required" }),
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
