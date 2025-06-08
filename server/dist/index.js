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
const emailAuthenticate_1 = require("./auth/emailAuthenticate");
const authenticate_1 = require("./auth/authenticate");
const express_1 = __importDefault(require("express"));
const verifySession_1 = require("./auth/verifySession");
const tokenTransfer_1 = require("./intents/tokenTransfer");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.get('/ping', (req, res) => {
    res.status(200).json({
        "message": "pong"
    });
});
app.post('/api/email/send-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, emailAuthenticate_1.sendOtp)(req.body.email);
    res.status(200).json(result);
}));
app.post('/api/email/verify-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = req.body.otp;
    const token = req.body.token;
    const result = yield (0, emailAuthenticate_1.verifyOtp)(token, otp, email);
    res.status(200).json(result);
}));
app.post('/api/email/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToken = req.body.idToken;
    const provider = 'okto';
    const result = yield (0, authenticate_1.authenticate)(idToken, provider);
    res.status(200).json(result);
}));
app.post('/api/google/oauth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtCredential = req.body.credential;
    const oktaAuthToken = yield (0, authenticate_1.authenticate)(jwtCredential, 'google');
    res.redirect(`https://okto-production.up.railway.app?oktaAuthToken=${oktaAuthToken}`);
}));
app.post('/api/google/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToken = req.body.idToken;
    const provider = 'google';
    const result = yield (0, authenticate_1.authenticate)(idToken, provider);
    res.status(200).json(result);
}));
app.get('/api/verify-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const idToken = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    const resp = yield (0, verifySession_1.verifySession)(idToken);
    res.status(200).json(resp);
}));
app.post('/api/token-transfer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    const idToken = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    const senderAddr = req.body.senderAddress;
    const amount = req.body.amount;
    const sessionConfig = req.body.sessionConfig;
    const data = {
        caip2Id: "eip155:84532", // BASE_TESTNET
        recipient: senderAddr,
        token: "", // Left empty because transferring native token
        amount: amount, // denomination in lowest decimal (18 for WETH)
    };
    const result = yield (0, tokenTransfer_1.transferToken)(data, sessionConfig, idToken);
    res.json({ result: result });
}));
app.listen(8080);
