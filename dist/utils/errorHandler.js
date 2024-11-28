"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error) => {
    if (error instanceof Error) {
        return { status: 500, message: error.message };
    }
    return { status: 500, message: "Unknown error occurred" };
};
exports.errorHandler = errorHandler;
