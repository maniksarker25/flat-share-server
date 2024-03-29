import { z } from "zod";
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
    bio: z.string({
      required_error: "Bio is required",
      invalid_type_error: "Bio must be a string",
    }),
    profession: z.string({
      required_error: "Profession is required",
      invalid_type_error: "Profession must be a string",
    }),
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    }),
  }),
});

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    bio: z.string({ invalid_type_error: "Bio must be a string" }).optional(),
    profession: z
      .string({ invalid_type_error: "Profession must be a string" })
      .optional(),
    address: z
      .string({ invalid_type_error: "Address must be a string" })
      .optional(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserProfileValidationSchema,
};
