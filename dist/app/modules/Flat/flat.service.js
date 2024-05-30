"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const paginatonHelper_1 = require("../../helpers/paginatonHelper");
const flat_constant_1 = require("./flat.constant");
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const convertSrtingToBoolean_1 = __importDefault(require("../../helpers/convertSrtingToBoolean"));
const createFlatIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.userId = userId;
    const result = yield prisma_1.default.flat.create({
        data: payload,
    });
    return result;
});
const getFlatsFromDB = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure limit and skip
    const convertStringToBoolean = (0, convertSrtingToBoolean_1.default)(query);
    const { page, limit, skip } = (0, paginatonHelper_1.calculatePagination)(options);
    const { searchTerm } = convertStringToBoolean, filterData = __rest(convertStringToBoolean, ["searchTerm"]);
    console.log(filterData);
    filterData.totalBedrooms = Number(filterData.totalBedrooms);
    filterData.minPrice = Number(filterData.minPrice);
    filterData.maxPrice = Number(filterData.maxPrice);
    // make a default and condition-------
    const andConditions = [];
    // if searchTerm is exists in query
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        andConditions.push({
            OR: flat_constant_1.flatSearchableFields.map((field) => ({
                [field]: {
                    contains: query === null || query === void 0 ? void 0 : query.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    // make queries for filter data
    // if (Object.keys(filterData)?.length > 0) {
    //   andConditions.push({
    //     AND: Object.keys(filterData)?.map((key) => ({
    //       [key]: {
    //         equals: (filterData as any)[key],
    //       },
    //     })),
    //   });
    // }
    if (filterData === null || filterData === void 0 ? void 0 : filterData.totalBedrooms) {
        andConditions.push({
            totalBedrooms: {
                equals: filterData === null || filterData === void 0 ? void 0 : filterData.totalBedrooms,
            },
        });
    }
    if (filterData.minPrice && !filterData.maxPrice) {
        andConditions.push({
            rentAmount: {
                gte: filterData.minPrice,
            },
        });
    }
    if (!filterData.minPrice && filterData.maxPrice) {
        andConditions.push({
            rentAmount: {
                lte: filterData.maxPrice,
            },
        });
    }
    if (filterData.minPrice && filterData.maxPrice) {
        andConditions.push({
            rentAmount: {
                lte: filterData.maxPrice,
                gte: filterData.minPrice,
            },
        });
    }
    const whereConditions = { AND: andConditions };
    console.dir(whereConditions, { depth: "infinity" });
    const result = yield prisma_1.default.flat.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && (options === null || options === void 0 ? void 0 : options.sortOrder)
            ? {
                [options === null || options === void 0 ? void 0 : options.sortBy]: options === null || options === void 0 ? void 0 : options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.flat.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single flat
const getSingleFlatFromDB = (flatId) => __awaiter(void 0, void 0, void 0, function* () {
    const flat = yield prisma_1.default.flat.findUnique({
        where: {
            id: flatId,
        },
    });
    if (!flat) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Flat not found");
    }
    return flat;
});
// get my flats
const getMyFlatsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.findMany({
        where: {
            userId,
        },
    });
    return result;
});
// update flat into db
const updateFlatIntoDB = (flatId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const flat = yield prisma_1.default.flat.findUnique({
        where: {
            id: flatId,
        },
    });
    if (!flat) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Flat not found");
    }
    const result = yield prisma_1.default.flat.update({
        where: {
            id: flatId,
        },
        data: payload,
    });
    return result;
});
const deleteFlatFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const flat = yield prisma_1.default.flat.findUnique({
        where: {
            id,
        },
    });
    if (!flat) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Flat not found");
    }
    // const result = await prisma.flat.delete({
    //   where: {
    //     id,
    //   },
    // });
    // return result;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteBooking = yield transactionClient.booking.deleteMany({
            where: {
                flatId: id,
            },
        });
        const deleteFlat = yield transactionClient.flat.delete({
            where: {
                id,
            },
        });
    }));
    return result;
});
exports.flatService = {
    createFlatIntoDB,
    getFlatsFromDB,
    getMyFlatsFromDB,
    getSingleFlatFromDB,
    updateFlatIntoDB,
    deleteFlatFromDB,
};
