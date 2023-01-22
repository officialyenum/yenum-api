"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const game_controller_1 = __importDefault(require("../controllers/api/game.controller"));
const router = (0, express_1.Router)();
/** Set up your api routes here */
// Post routes
router.get('/', game_controller_1.default.index);
router.post('/', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.game.create), game_controller_1.default.create);
router.patch('/:id', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.game.update), game_controller_1.default.update);
router.get('/:id', game_controller_1.default.show);
router.delete('/:id', game_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=game.route.js.map