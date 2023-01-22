"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controllers/api/index.controller"));
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const game_route_1 = __importDefault(require("./game.route"));
const router = (0, express_1.Router)();
/** Set up your api routes here */
// Health check
router.get('/', index_controller_1.default.index);
router.get('/ping', index_controller_1.default.health);
// Auth routes
router.use('/auth', auth_route_1.default);
// User routes
router.use('/users', user_route_1.default);
// Game routes
router.use('/games', game_route_1.default);
exports.default = router;
//# sourceMappingURL=api.js.map