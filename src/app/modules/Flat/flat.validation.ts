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
    detailedDescription: z.string({
      required_error: "Detailed description is required",
      invalid_type_error: "Detailed description must be a string",
    }),
    location: z.string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    }),
    amenities: z.string({
      required_error: "Amenities is required",
      invalid_type_error: "Amenities must be a string",
    }),
    rentAmount: z.number({
      required_error: "Rent amount is required ",
      invalid_type_error: "Rent amount must be a number",
    }),
    advancedAmount: z.number({
      required_error: "Advanced amount is required ",
      invalid_type_error: "Advanced amount must be a number",
    }),
    photo: z.string({
      required_error: "Photo is required",
      invalid_type_error: "Photo must be a string",
    }),
  }),
});
const updateFlatValidationSchema = z.object({
  body: z.object({
    squareFeet: z
      .number({
        invalid_type_error: "Square feet must be a number",
      })
      .optional(),
    totalBedrooms: z
      .number({
        invalid_type_error: "Total bedrooms must be a number",
      })
      .optional(),
    totalRooms: z
      .number({
        invalid_type_error: "Total rooms must be a number",
      })
      .optional(),
    utilitiesDescription: z
      .string({
        invalid_type_error: "Utilities description must be a string",
      })
      .optional(),
    location: z
      .string({
        invalid_type_error: "Location must be a string",
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: "Description must be a string",
      })
      .optional(),
    rent: z
      .number({
        invalid_type_error: "Rent amount must be a number",
      })
      .optional(),
    advanceAmount: z
      .number({
        invalid_type_error: "Advance amount must be a number",
      })
      .optional(),
    availability: z.boolean().optional(),
  }),
});

export const flatValidation = {
  createFlatValidationSchema,
  updateFlatValidationSchema,
};
