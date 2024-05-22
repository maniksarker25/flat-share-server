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
    photos: z.array(
      z.string({
        required_error: "Each photo is required",
        invalid_type_error: "Each photo must be a string",
      })
    ),
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
    detailedDescription: z
      .string({
        invalid_type_error: "Detailed description must be a string",
      })
      .optional(),
    location: z
      .string({
        invalid_type_error: "Location must be a string",
      })
      .optional(),
    amenities: z
      .string({
        invalid_type_error: "Amenities must be a string",
      })
      .optional(),
    rentAmount: z
      .number({
        invalid_type_error: "Rent amount must be a number",
      })
      .optional(),
    advancedAmount: z
      .number({
        invalid_type_error: "Advanced amount must be a number",
      })
      .optional(),
    photos: z
      .array(
        z.string({
          invalid_type_error: "Each photo must be a string",
        })
      )
      .optional(),
  }),
});

export const flatValidation = {
  createFlatValidationSchema,
  updateFlatValidationSchema,
};
