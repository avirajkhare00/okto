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
exports.generateClientSignature = generateClientSignature;
const ethers_1 = require("ethers");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client_private_key = process.env.OKTO_CLIENT_PRIVATE_KEY;
// Replace with your actual private key (Client Private Key)
// Remove '0x' prefix if it exists
const privateKey = client_private_key.startsWith("0x")
    ? client_private_key.slice(2)
    : client_private_key;
const wallet = new ethers_1.ethers.Wallet(privateKey);
/**
 * Signs any arbitrary payload (no key sorting).
 * @param data - The payload object to sign
 * @returns {Promise<string>} - A hex signature string
 *
 */
function generateClientSignature(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = JSON.stringify(data);
        const signature = yield wallet.signMessage(message);
        return signature;
    });
}
