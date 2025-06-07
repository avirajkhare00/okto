"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonceToBigInt = nonceToBigInt;
const uuid_1 = require("uuid");
/**
 * Converts a UUID string to a BigInt value
 * @param nonce - UUID string to convert
 * @returns BigInt representation of the UUID
 */
function nonceToBigInt(nonce) {
    const uuidBytes = (0, uuid_1.parse)(nonce); // Get the 16-byte array of the UUID
    let bigInt = BigInt(0);
    for (let i = 0; i < uuidBytes.length; i++) {
        if (uuidBytes[i] !== undefined) {
            bigInt = (bigInt << BigInt(8)) | BigInt(uuidBytes[i]);
        }
    }
    return bigInt;
}
