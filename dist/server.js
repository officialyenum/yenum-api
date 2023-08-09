"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const app_1 = require("./app");
dotenv_1.default.config(); // load .env file
// Setup Mongoose
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority'
})
    .then(() => {
    Logging_1.default.info('Connected to MongoDB');
    const PORT = process.env.PORT || 4000;
    app_1.app.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server started at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    Logging_1.default.error('Unable to connect to MongoDB');
    Logging_1.default.error(err);
});
//# sourceMappingURL=server.js.map