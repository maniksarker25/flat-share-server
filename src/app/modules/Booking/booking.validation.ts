import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    flatId: z.string({ required_error: "flat id is required" }),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
};
