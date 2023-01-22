"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express = __importStar(require("express"));
const web_1 = __importDefault(require("./web"));
const api_1 = __importDefault(require("./api"));
const Logging_1 = __importDefault(require("../library/Logging"));
const register = (app) => {
    // Logging middleware
    app.use((req, res, next) => {
        Logging_1.default.info(`Incoming -> Method: [${req.method}] - url : [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the response */
            Logging_1.default.info(`Outgoing -> Method: [${req.method}] - url : [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    // Setup routes
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // Setup Web routes in 'src/routes/web.ts'
    app.use('/', web_1.default);
    // Setup Api routes in 'src/routes/api.ts'
    app.use('/api', api_1.default);
    /** Error Handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        return res.status(404).json({
            message: error.message
        });
    });
};
exports.register = register;
//# sourceMappingURL=index.js.map