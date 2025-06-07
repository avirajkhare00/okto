"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionKey = void 0;
const secp256k1_1 = require("@noble/curves/secp256k1");
const sha3_1 = require("@noble/hashes/sha3");
/**
* Class used to create and manage session keys
*
* This class provides functionality to create, manage, and use session keys. It handles both creation of
* new random keys and importing existing private keys.
*
* @param privKey - Optional existing private key to import. If not provided, a random private key will be generated.
*/
class SessionKey {
    constructor(privKey) {
        if (privKey) {
            this.priv = Uint8Array.from(Buffer.from(privKey.replace("0x", ""), "hex"));
        }
        else {
            this.priv = secp256k1_1.secp256k1.utils.randomPrivateKey();
        }
    }
    get privateKey() {
        return this.priv;
    }
    get uncompressedPublicKey() {
        return secp256k1_1.secp256k1.getPublicKey(this.priv, false);
    }
    get compressedPublicKey() {
        return secp256k1_1.secp256k1.getPublicKey(this.priv, true);
    }
    get privateKeyHex() {
        return Buffer.from(this.priv).toString("hex");
    }
    get uncompressedPublicKeyHex() {
        return Buffer.from(this.uncompressedPublicKey).toString("hex");
    }
    get privateKeyHexWith0x() {
        return `0x${Buffer.from(this.priv).toString("hex")}`;
    }
    get uncompressedPublicKeyHexWith0x() {
        return `0x${Buffer.from(this.uncompressedPublicKey).toString("hex")}`;
    }
    get ethereumAddress() {
        const publicKeyWithoutPrefix = this.uncompressedPublicKey.slice(1);
        const hash = (0, sha3_1.keccak_256)(publicKeyWithoutPrefix);
        return `0x${Buffer.from(hash.slice(-20)).toString("hex")}`;
    }
    static create() {
        return new SessionKey(null);
    }
    static fromPrivateKey(privateKey) {
        return new SessionKey(privateKey);
    }
    verifySignature({ payload, signature }) {
        return secp256k1_1.secp256k1.verify(payload, signature, this.uncompressedPublicKey);
    }
}
exports.SessionKey = SessionKey;
