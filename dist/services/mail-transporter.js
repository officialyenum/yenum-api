"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
console.log(config_1.config.mail.email);
console.log(config_1.config.mail.password);
const mailTransporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.config.mail.email,
        pass: config_1.config.mail.password
    }
});
exports.default = mailTransporter;
//# sourceMappingURL=mail-transporter.js.map