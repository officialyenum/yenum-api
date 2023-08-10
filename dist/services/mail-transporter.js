"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = require("../config/config");
mail_1.default.setApiKey(config_1.config.transportKey);
exports.default = mail_1.default;
//# sourceMappingURL=mail-transporter.js.map