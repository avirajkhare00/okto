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
exports.invokeAuthenticate = invokeAuthenticate;
const axios_1 = __importDefault(require("axios"));
/**
 * Invokes the Okto authenticate JSON-RPC method
 *
 * This function sends an authentication request to the Okto RPC gateway.
 *
 * @param authPayload - The authentication payload object containing session, clientSWA and clientPrivateKey
 *
 * @returns The response from the authentication request if successful.
 *
 * @throws Error if authentication fails, with details about the failure.
 */
function invokeAuthenticate(authPayload) {
    return __awaiter(this, void 0, void 0, function* () {
        // Construct the request body for the authenticate JSON RPC Method
        var _a, _b, _c, _d, _e;
        console.log("Request Body:", authPayload);
        try {
            const response = yield axios_1.default.post("https://sandbox-api.okto.tech/api/oc/v1/authenticate", authPayload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                return response;
            }
            else {
                throw new Error(((_a = response.data.error) === null || _a === void 0 ? void 0 : _a.message) || "Authentication failed");
            }
        }
        catch (err) {
            const errorMessage = ((_d = (_c = (_b = err.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) ||
                "An error occurred during authentication";
            console.error("Error:", (_e = err.response) === null || _e === void 0 ? void 0 : _e.data);
            throw new Error(errorMessage);
        }
    });
}
