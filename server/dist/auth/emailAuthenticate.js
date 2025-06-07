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
exports.sendOtp = sendOtp;
exports.verifyOtp = verifyOtp;
const axios_1 = __importDefault(require("axios"));
const generateClientSignature_1 = require("../utils/generateClientSignature");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_swa = process.env.OKTO_CLIENT_SWA;
/*
* function used to make a post request to okto staging api
*/
function postSignedRequest(endpoint, fullPayload) {
    return __awaiter(this, void 0, void 0, function* () {
        const payloadWithTimestamp = Object.assign(Object.assign({}, fullPayload), { timestamp: Date.now() - 1000 });
        const signature = yield (0, generateClientSignature_1.generateClientSignature)(payloadWithTimestamp);
        const requestBody = {
            data: payloadWithTimestamp,
            client_signature: signature,
            type: "ethsign",
        };
        console.log("Request Body:");
        const response = yield axios_1.default.post(endpoint, requestBody, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    });
}
/**
 * This function sends an OTP to the user's Email-Id for authentication.
 */
function sendOtp(email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const payload = {
            email: email, // Replace with the user's Email ID
            client_swa: client_swa, // Replace with your client_swa
        };
        try {
            console.log("Calling sendOtp with payload");
            const res = yield postSignedRequest("https://sandbox-api.okto.tech/api/oc/v1/authenticate/email", payload);
            console.log("OTP Sent:", res);
            return res;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error("Axios error (sendOTP):", (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                return (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            }
            else {
                console.error("Unexpected error:", error);
                return error;
            }
        }
    });
}
/**
 * This function verifies the OTP received via Email.
 * It should be called with the token returned from the sendOtp() call, along with the OTP received via Eamil.
 */
function verifyOtp(token, otp, email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const payload = {
            email: email, // Replace with the user's Email ID
            token: token,
            otp: otp,
            client_swa: client_swa, // Replace with your client_swa
        };
        try {
            const res = yield postSignedRequest("https://sandbox-api.okto.tech/api/oc/v1/authenticate/email/verify", payload);
            console.log("OTP Verified:", res);
            const data = res.data;
            return data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error("Axios error (verifyOTP):", (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                return (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            }
            else {
                console.error("Unexpected error:", error);
                return error;
            }
        }
    });
}
