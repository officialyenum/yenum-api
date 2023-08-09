"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const anonymous_message_controller_1 = __importDefault(require("../controllers/api/anonymous-message.controller"));
const router = (0, express_1.Router)();
/** Set up your api routes here */
// User routes
router.get('/', anonymous_message_controller_1.default.index);
router.post('/', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.anonymousMessage.create), anonymous_message_controller_1.default.create);
router.patch('/:id', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.anonymousMessage.update), anonymous_message_controller_1.default.update);
router.get('/sync', anonymous_message_controller_1.default.sync);
router.get('/:id', anonymous_message_controller_1.default.show);
router.delete('/:id', anonymous_message_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=anonymous-message.route.js.map