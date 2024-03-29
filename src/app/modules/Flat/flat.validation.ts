import { z } from "zod";
const createFlatValidationSchema = z.object({
  body: z.object({
    squareFeet: z.number({
      required_error: "Square feet required",
      invalid_type_error: "Square feet must be a number",
    }),
    totalBedrooms: z.number({
      required_error: "Total bedrooms is required ",
      invalid_type_error: "Total bedrooms must be a number",
    }),
    totalRooms: z.number({
      required_error: "Total rooms is required ",
      invalid_type_error: "Total rooms must be a number",
    }),
    utilitiesDescription: z.string({
      required_error: "Utilities description is required",
      invalid_type_error: "Utilities description must be a string",
    }),
    location: z.string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    rent: z.number({
      required_error: "Rent amount is required ",
      invalid_type_error: "Rent amount must be a number",
    }),
    advanceAmount: z.number({
      required_error: "Advance amount is required ",
      invalid_type_error: "Advance amount must be a number",
    }),
  }),
});

export const flatValidation = {
  createFlatValidationSchema,
};
