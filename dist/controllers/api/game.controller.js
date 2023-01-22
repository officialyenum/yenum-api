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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Game_1 = __importDefault(require("../../models/Game"));
class GameController {
}
_a = GameController;
GameController.index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return Game_1.default.find()
        .select('-__v')
        .then((games) => res.status(200).json({ games }))
        .catch((err) => res.status(500).json({ err }));
});
GameController.create = (req, res, next) => {
    const game = new Game_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        image_url: req.body.image_url,
        tags: req.body.tags
    });
    return game
        .save()
        .then((newGame) => res.status(201).json({ newGame }))
        .catch((err) => res.status(500).json({ err }));
};
GameController.show = (req, res, next) => {
    const gameId = req.params.id;
    return Game_1.default.findById(gameId)
        .select('-__v')
        .then((game) => (game ? res.status(200).json({ game }) : res.status(404).json({ message: 'Game not found' })))
        .catch((err) => res.status(500).json({ err }));
};
GameController.update = (req, res, next) => {
    const gameId = req.params.id;
    return Game_1.default.findById(gameId)
        .then((updatedGame) => {
        if (updatedGame) {
            updatedGame.set(req.body);
            return updatedGame
                .save()
                .then((newGame) => res.status(201).json({ newGame }))
                .catch((err) => res.status(500).json({ err }));
        }
        else {
            return res.status(404).json({ message: 'Game not found' });
        }
    })
        .catch((err) => res.status(500).json({ err }));
};
GameController.delete = (req, res, next) => {
    const gameId = req.params.id;
    return Game_1.default.findByIdAndDelete(gameId)
        .then((post) => (post ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Game not found' })))
        .catch((err) => res.status(500).json({ err }));
};
exports.default = GameController;
//# sourceMappingURL=game.controller.js.map