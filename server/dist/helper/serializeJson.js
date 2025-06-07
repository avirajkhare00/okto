"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeJSON = serializeJSON;
/*
 * Serializes an object to JSON, handling BigInt values properly
*/
function serializeJSON(obj, space = null) {
    return JSON.stringify(obj, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value, space);
}
