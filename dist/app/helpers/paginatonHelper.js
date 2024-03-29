"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * Number(limit);
    const sortBy = (options === null || options === void 0 ? void 0 : options.sortBy) || "createdAt";
    const sortOrder = (options === null || options === void 0 ? void 0 : options.sortOrder) || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.calculatePagination = calculatePagination;
