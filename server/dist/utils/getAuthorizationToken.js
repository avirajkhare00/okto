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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizationToken = getAuthorizationToken;
const accounts_1 = require("viem/accounts");
/**
 * Creates the Okto Auth Token
 *
 * This function is used to create the Okto Auth Token after successfull authentication
 *
 * @param sessionConfig - Object containing session authentication details:
 *   - sessionPrivKey: The private key of the current session
 *   - sessionPubKey: The public key corresponding to the session private key
 *
 * @returns Base64 encoded authorization token
 * @throws Error if session keys are not provided in the configuration
 */
function getAuthorizationToken(sessionConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionPriv = sessionConfig === null || sessionConfig === void 0 ? void 0 : sessionConfig.sessionPrivKey;
        const sessionPub = sessionConfig === null || sessionConfig === void 0 ? void 0 : sessionConfig.sessionPubKey;
        if (sessionPriv === void 0 || sessionPub === void 0) {
            throw new Error("Session keys are not set");
        }
        const data = {
            expire_at: Math.round(Date.now() / 1e3) + 60 * 90,
            session_pub_key: sessionPub,
        };
        // Okto auth token is nothing but the session public key encrypted with the session private key
        const payload = {
            type: "ecdsa_uncompressed",
            data,
            data_signature: yield (0, accounts_1.signMessage)({
                message: JSON.stringify(data),
                privateKey: sessionPriv,
            }),
        };
        return btoa(JSON.stringify(payload));
    });
}
