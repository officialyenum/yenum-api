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
const AnonymousMessage_1 = __importDefault(require("../../models/AnonymousMessage"));
const axios_1 = __importDefault(require("axios"));
class AnonymousMessageController {
}
_a = AnonymousMessageController;
AnonymousMessageController.index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield AnonymousMessage_1.default.find();
        const filteredData = yield AnonymousMessage_1.default.find({
            published: { $in: req.body.published }
        });
        let publishedCount = 0;
        let unPublishedCount = 0;
        data.forEach(item => {
            if (item.published === 1) {
                publishedCount++;
            }
            else {
                unPublishedCount++;
            }
        });
        const total = data.length;
        res.status(200).json({
            all: total,
            published: publishedCount,
            unpublished: unPublishedCount,
            filteredData
        });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
AnonymousMessageController.show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield AnonymousMessage_1.default.findById(req.params.id).select('-__v');
        if (!data) {
            throw new Error("Not Found");
        }
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
AnonymousMessageController.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const anonymousMessage = yield new AnonymousMessage_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            content: req.body.content,
            published: 0
        });
        yield anonymousMessage.save();
        return res.status(201).json({ anonymousMessage });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
AnonymousMessageController.update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAnonymousMessage = yield AnonymousMessage_1.default.findById(req.params.id);
        if (updatedAnonymousMessage) {
            updatedAnonymousMessage.set(req.body);
            yield updatedAnonymousMessage.save();
            return res.status(201).json({ updatedAnonymousMessage });
        }
        else {
            throw new Error("Not found");
        }
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
AnonymousMessageController.delete = (req, res, next) => {
    const gameId = req.params.id;
    return AnonymousMessage_1.default.findByIdAndDelete(gameId)
        .then((post) => (post ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Game not found' })))
        .catch((err) => res.status(500).json({ err }));
};
AnonymousMessageController.sync = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, status } = yield axios_1.default.get('https://dashboard.yenum.dev/api/anonymous-yellow/2/all', {
            headers: {
                Accept: 'application/json',
            },
        });
        const messagesToCreateOrUpdate = data.data.map((message) => ({
            content: message.content,
            published: message.published,
            createdAt: message.created_at,
            updatedAt: message.updated_at,
        }));
        for (const messageData of messagesToCreateOrUpdate) {
            yield AnonymousMessage_1.default.findOneAndUpdate({ content: messageData.content }, messageData, { upsert: true });
        }
        return res.status(200).json({ message: 'Messages synchronized successfully' });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
exports.default = AnonymousMessageController;
//# sourceMappingURL=anonymous-message.controller.js.map