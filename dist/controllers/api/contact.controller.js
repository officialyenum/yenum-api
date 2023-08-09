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
const Contact_1 = __importDefault(require("../../models/Contact"));
class ContactController {
}
_a = ContactController;
ContactController.index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return Contact_1.default.find()
        .select('-__v')
        .then((games) => res.status(200).json({ games }))
        .catch((err) => res.status(500).json({ err }));
});
ContactController.create = (req, res, next) => {
    const contact = new Contact_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        content: req.body.title,
        published: 0
    });
    return contact
        .save()
        .then((newContact) => res.status(201).json({ newContact }))
        .catch((err) => res.status(500).json({ err }));
};
ContactController.show = (req, res, next) => {
    const gameId = req.params.id;
    return Contact_1.default.findById(gameId)
        .select('-__v')
        .then((contact) => (contact ? res.status(200).json({ contact }) : res.status(404).json({ message: 'Message not found' })))
        .catch((err) => res.status(500).json({ err }));
};
ContactController.update = (req, res, next) => {
    const gameId = req.params.id;
    return Contact_1.default.findById(gameId)
        .then((updatedContact) => {
        if (updatedContact) {
            updatedContact.set(req.body);
            return updatedContact
                .save()
                .then((newContact) => res.status(201).json({ newContact }))
                .catch((err) => res.status(500).json({ err }));
        }
        else {
            return res.status(404).json({ message: 'Game not found' });
        }
    })
        .catch((err) => res.status(500).json({ err }));
};
ContactController.delete = (req, res, next) => {
    const gameId = req.params.id;
    return Contact_1.default.findByIdAndDelete(gameId)
        .then((contact) => (contact ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Contact not found' })))
        .catch((err) => res.status(500).json({ err }));
};
exports.default = ContactController;
//# sourceMappingURL=contact.controller.js.map