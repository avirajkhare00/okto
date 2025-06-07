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
exports.generatePaymasterData = generatePaymasterData;
exports.paymasterData = paymasterData;
const viem_1 = require("viem");
const nonceToBigInt_1 = require("../helper/nonceToBigInt");
const accounts_1 = require("viem/accounts");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const clientPrivateKey = process.env.OKTO_CLIENT_PRIVATE_KEY;
const clientSWA = process.env.OKTO_CLIENT_SWA;
/**
 * Generates paymaster data for transactions
 *
 * @param address - The client's Smart Wallet Account (SWA) address
 * @param privateKey - The client's private key used for signing
 * @param nonce - The transaction nonce
 * @param validUntil - Timestamp until which the paymaster data is valid (in seconds)
 * @param validAfter - Timestamp after which the paymaster data becomes valid (in seconds)
 * @returns A hex string containing the encoded paymaster data including signature
 */
function generatePaymasterData(address, privateKey, nonce, validUntil, validAfter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validUntil instanceof Date) {
            validUntil = Math.floor(validUntil.getTime() / 1000);
        }
        else if (typeof validUntil === "bigint") {
            validUntil = parseInt(validUntil.toString());
        }
        if (validAfter instanceof Date) {
            validAfter = Math.floor(validAfter.getTime() / 1000);
        }
        else if (typeof validAfter === "bigint") {
            validAfter = parseInt(validAfter.toString());
        }
        else if (validAfter === void 0) {
            validAfter = 0;
        }
        const paymasterDataHash = (0, viem_1.keccak256)((0, viem_1.encodePacked)(["bytes32", "address", "uint48", "uint48"], [
            (0, viem_1.toHex)((0, nonceToBigInt_1.nonceToBigInt)(nonce), { size: 32 }),
            address,
            validUntil,
            validAfter,
        ]));
        const sig = yield (0, accounts_1.signMessage)({
            message: {
                raw: (0, viem_1.fromHex)(paymasterDataHash, "bytes"),
            },
            privateKey: privateKey,
        });
        const paymasterData = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)("address, uint48, uint48, bytes"), [address, validUntil, validAfter, sig]);
        return paymasterData;
    });
}
function paymasterData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ nonce, validUntil, validAfter }) {
        return generatePaymasterData(clientSWA, clientPrivateKey, nonce, validUntil, validAfter);
    });
}
