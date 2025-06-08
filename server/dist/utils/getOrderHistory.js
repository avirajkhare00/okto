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
exports.getOrderHistory = getOrderHistory;
const axios_1 = __importDefault(require("axios"));
const FINAL_STATUSES = ["SUCCESSFUL", "FAILED", "BUNDLER_DISCARDED"];
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function getOrderHistory(OktoAuthToken_1, intentId_1, intentType_1) {
    return __awaiter(this, arguments, void 0, function* (OktoAuthToken, intentId, intentType, intervalMs = 5000) {
        var _a, _b, _c;
        while (true) {
            try {
                const response = yield axios_1.default.get(`https://sandbox-api.okto.tech/api/oc/v1/orders?intent_id=${intentId}&intent_type=${intentType}`, {
                    headers: {
                        Authorization: `Bearer ${OktoAuthToken}`,
                    },
                });
                const items = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.items;
                const status = (_c = items === null || items === void 0 ? void 0 : items[0]) === null || _c === void 0 ? void 0 : _c.status;
                console.log("Current Order Status:", status);
                if (FINAL_STATUSES.includes(status)) {
                    console.log("Final Status Reached:", status);
                    console.log("Full Order:", JSON.stringify(items[0], null, 2));
                    return status;
                }
                yield delay(intervalMs);
            }
            catch (error) {
                console.error("Error while polling order status:", error);
                throw new Error("Polling failed");
            }
        }
    });
}
