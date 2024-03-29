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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const createBookingIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const flat = yield prisma_1.default.flat.findUnique({
        where: {
            id: payload.flatId,
        },
    });
    if (!flat) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Flat not found");
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const bookingData = {
        userId,
        flatId: payload.flatId,
    };
    const result = yield prisma_1.default.booking.create({
        data: bookingData,
    });
    return result;
});
// get booking requests from db
const getBookingRequestsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany();
    return result;
});
// update booking flat application status into db
const updateBookingFlatApplicationStatusIntoDB = (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(status);
    const booking = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Booking is not found");
    }
    const result = yield prisma_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: status,
    });
    return result;
});
exports.bookingService = {
    createBookingIntoDB,
    getBookingRequestsFromDB,
    updateBookingFlatApplicationStatusIntoDB,
};
