"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePackedUserOp = generatePackedUserOp;
exports.generateUserOpHash = generateUserOpHash;
const viem_1 = require("viem");
const constants_js_1 = require("../helper/constants.js");
/**
 * Creates the Packed UserOp (User Operation)
 *
 * This function packages various user operation parameters into a structured format.
 *
 * @param userOp - Object containing the user operation details.
 * @returns Formatted UserOp object with packed gas parameters
 * @throws Error if any required parameters are missing
 */
function generatePackedUserOp(userOp) {
    if (!userOp.sender ||
        !userOp.nonce ||
        !userOp.callData ||
        !userOp.preVerificationGas ||
        !userOp.verificationGasLimit ||
        !userOp.callGasLimit ||
        !userOp.maxFeePerGas ||
        !userOp.maxPriorityFeePerGas ||
        userOp.paymaster == void 0 ||
        !userOp.paymasterVerificationGasLimit ||
        !userOp.paymasterPostOpGasLimit ||
        userOp.paymasterData == void 0) {
        throw new Error("Invalid UserOp");
    }
    const accountGasLimits = ("0x" +
        (0, viem_1.pad)(userOp.verificationGasLimit, {
            size: 16,
        }).replace("0x", "") +
        (0, viem_1.pad)(userOp.callGasLimit, {
            size: 16,
        }).replace("0x", ""));
    const gasFees = ("0x" +
        (0, viem_1.pad)(userOp.maxFeePerGas, {
            size: 16,
        }).replace("0x", "") +
        (0, viem_1.pad)(userOp.maxPriorityFeePerGas, {
            size: 16,
        }).replace("0x", ""));
    const paymasterAndData = userOp.paymaster
        ? (0, viem_1.concat)([
            userOp.paymaster,
            (0, viem_1.pad)(userOp.paymasterVerificationGasLimit, {
                size: 16,
            }),
            (0, viem_1.pad)(userOp.paymasterPostOpGasLimit, {
                size: 16,
            }),
            userOp.paymasterData,
        ])
        : "0x";
    const packedUserOp = {
        sender: userOp.sender,
        nonce: userOp.nonce,
        initCode: "0x",
        callData: userOp.callData,
        preVerificationGas: userOp.preVerificationGas,
        accountGasLimits,
        gasFees,
        paymasterAndData,
    };
    return packedUserOp;
}
/**
 * Generates the userOp Hash
 * Creates a unique hash that identifies the user operation.
 * This hash is used for signing purpose.
 *
 * @param userOp - Packed user operation object (output from generatePackedUserOp)
 * @returns The keccak256 hash of the user operation.
 */
function generateUserOpHash(userOp) {
    const pack = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)("address, bytes32, bytes32, bytes32, bytes32, uint256, bytes32, bytes32"), [
        userOp.sender,
        (0, viem_1.pad)(userOp.nonce, {
            size: 32,
        }),
        (0, viem_1.pad)((0, viem_1.keccak256)(userOp.initCode), {
            size: 32,
        }),
        (0, viem_1.pad)((0, viem_1.keccak256)(userOp.callData), {
            size: 32,
        }),
        (0, viem_1.pad)(userOp.accountGasLimits, {
            size: 32,
        }),
        (0, viem_1.hexToBigInt)(userOp.preVerificationGas),
        (0, viem_1.pad)(userOp.gasFees, {
            size: 32,
        }),
        (0, viem_1.pad)((0, viem_1.keccak256)(userOp.paymasterAndData), {
            size: 32,
        }),
    ]);
    const userOpPack = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)("bytes32, address, uint256"), [
        (0, viem_1.keccak256)(pack),
        constants_js_1.Constants.ENV_CONFIG.SANDBOX.ENTRYPOINT_CONTRACT_ADDRESS,
        BigInt(constants_js_1.Constants.ENV_CONFIG.SANDBOX.CHAIN_ID),
    ]);
    return (0, viem_1.keccak256)(userOpPack);
}
