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
exports.getChains = getChains;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const OktoAuthToken = process.env.OKTO_AUTH_TOKEN || "";
/**
 * Retrieves all the enabled networks from the Okto Client Dashboard
 *
 * This function makes an API call to Okto's sandbox API to fetch all supported networks that have been enabled for the client application.
 *
 * @param OktoAuthToken - Authentication token
 * @returns Object containing details of all supported blockchain networks available
 *          to the client application.
 *
 * @throws Error if the API request fails.
 */
function getChains(OktoAuthToken) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield axios_1.default.get("https://sandbox-api.okto.tech/api/oc/v1/supported/networks", {
                headers: {
                    Authorization: `Bearer ${OktoAuthToken}`,
                },
            });
            return response.data.data.network;
        }
        catch (error) {
            console.error("Error fetching supported networks:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error);
            throw new Error("Failed to fetch supported networks");
        }
    });
}
// Sample usage
// const chains = await getChains(OktoAuthToken);
// console.log("Supported Chains:", chains);
