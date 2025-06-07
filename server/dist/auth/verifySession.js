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
exports.verifySession = verifySession;
const axios_1 = __importDefault(require("axios"));
const VERIFY_SESSION_URL = "https://sandbox-api.okto.tech/api/oc/v1/verify-session";
function verifySession(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(VERIFY_SESSION_URL, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    });
}
