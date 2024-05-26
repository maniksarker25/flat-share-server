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
        detailedDescription: zod_1.z.string({
            required_error: "Detailed description is required",
            invalid_type_error: "Detailed description must be a string",
        }),
        location: zod_1.z.string({
            required_error: "Location is required",
            invalid_type_error: "Location must be a string",
        }),
        amenities: zod_1.z.string({
            required_error: "Amenities is required",
            invalid_type_error: "Amenities must be a string",
        }),
        rentAmount: zod_1.z.number({
            required_error: "Rent amount is required ",
            invalid_type_error: "Rent amount must be a number",
        }),
        advancedAmount: zod_1.z.number({
            required_error: "Advanced amount is required ",
            invalid_type_error: "Advanced amount must be a number",
        }),
        photos: zod_1.z.array(zod_1.z.string({
            required_error: "Each photo is required",
            invalid_type_error: "Each photo must be a string",
        })),
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
        detailedDescription: zod_1.z
            .string({
            invalid_type_error: "Detailed description must be a string",
        })
            .optional(),
        location: zod_1.z
            .string({
            invalid_type_error: "Location must be a string",
        })
            .optional(),
        amenities: zod_1.z
            .string({
            invalid_type_error: "Amenities must be a string",
        })
            .optional(),
        rentAmount: zod_1.z
            .number({
            invalid_type_error: "Rent amount must be a number",
        })
            .optional(),
        advancedAmount: zod_1.z
            .number({
            invalid_type_error: "Advanced amount must be a number",
        })
            .optional(),
        photos: zod_1.z
            .array(zod_1.z.string({
            invalid_type_error: "Each photo must be a string",
        }))
            .optional(),
    }),
});
exports.flatValidation = {
    createFlatValidationSchema,
    updateFlatValidationSchema,
};
