"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatValidation = void 0;
const zod_1 = require("zod");
const createFlatValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        squareFeet: zod_1.z.number({
            required_error: "Square feet required",
            invalid_type_error: "Square feet must be a number",
        }),
        totalBedrooms: zod_1.z.number({
            required_error: "Total bedrooms is required ",
            invalid_type_error: "Total bedrooms must be a number",
        }),
        totalRooms: zod_1.z.number({
            required_error: "Total rooms is required ",
            invalid_type_error: "Total rooms must be a number",
        }),
        utilitiesDescription: zod_1.z.string({
            required_error: "Utilities description is required",
            invalid_type_error: "Utilities description must be a string",
        }),
        location: zod_1.z.string({
            required_error: "Location is required",
            invalid_type_error: "Location must be a string",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        }),
        rent: zod_1.z.number({
            required_error: "Rent amount is required ",
            invalid_type_error: "Rent amount must be a number",
        }),
        advanceAmount: zod_1.z.number({
            required_error: "Advance amount is required ",
            invalid_type_error: "Advance amount must be a number",
        }),
    }),
});
const updateFlatValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        squareFeet: zod_1.z
            .number({
            invalid_type_error: "Square feet must be a number",
        })
            .optional(),
        totalBedrooms: zod_1.z
            .number({
            invalid_type_error: "Total bedrooms must be a number",
        })
            .optional(),
        totalRooms: zod_1.z
            .number({
            invalid_type_error: "Total rooms must be a number",
        })
            .optional(),
        utilitiesDescription: zod_1.z
            .string({
            invalid_type_error: "Utilities description must be a string",
        })
            .optional(),
        location: zod_1.z
            .string({
            invalid_type_error: "Location must be a string",
        })
            .optional(),
        description: zod_1.z
            .string({
            invalid_type_error: "Description must be a string",
        })
            .optional(),
        rent: zod_1.z
            .number({
            invalid_type_error: "Rent amount must be a number",
        })
            .optional(),
        advanceAmount: zod_1.z
            .number({
            invalid_type_error: "Advance amount must be a number",
        })
            .optional(),
        availability: zod_1.z.boolean().optional(),
    }),
});
exports.flatValidation = {
    createFlatValidationSchema,
    updateFlatValidationSchema,
};
