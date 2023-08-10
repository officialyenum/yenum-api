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
const axios_1 = __importDefault(require("axios"));
const mail_transporter_1 = __importDefault(require("../../services/mail-transporter"));
class ContactController {
}
_a = ContactController;
ContactController.index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Contact_1.default.find();
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
ContactController.show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Contact_1.default.findById(req.params.id).select('-__v');
        if (!data) {
            throw new Error("Not Found");
        }
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
ContactController.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield new Contact_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            project: req.body.project,
            message: req.body.message,
            sent_date: Date.now(),
        });
        const msg = {
            to: "oponechukwuyenum@gmail.com",
            from: "admin@chuckymagic.com",
            subject: contact.project,
            html: `<p>Name : ${contact.name},</p></br><p>Email : ${contact.email},</p></br><p>Message: ${contact.message}!</p>`
        };
        const resp = yield mail_transporter_1.default.send(msg);
        console.log(resp);
        yield contact.save();
        return res.status(201).json({
            contact
        });
    }
    catch (error) {
        console.log(error);
        if (error.response) {
            return res.status(400).json({ err: error.response.body });
        }
        return res.status(500).json({ err: error.message });
    }
});
ContactController.update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedContact = yield Contact_1.default.findById(req.params.id);
        if (updatedContact) {
            updatedContact.set(req.body);
            yield updatedContact.save();
            return res.status(201).json({ updatedContact });
        }
        else {
            throw new Error("Not found");
        }
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
ContactController.delete = (req, res, next) => {
    const gameId = req.params.id;
    return Contact_1.default.findByIdAndDelete(gameId)
        .then((post) => (post ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Game not found' })))
        .catch((err) => res.status(500).json({ err }));
};
ContactController.sync = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, status } = yield axios_1.default.get('https://dashboard.yenum.dev/api/contact', {
            headers: {
                Accept: 'application/json',
            },
        });
        const messagesToCreateOrUpdate = data.data.map((contact) => ({
            name: contact.name,
            email: contact.email,
            project: contact.project,
            message: contact.message,
            sent_date: contact.created_at,
        }));
        for (const messageData of messagesToCreateOrUpdate) {
            yield Contact_1.default.findOneAndUpdate({ email: messageData.email }, messageData, { upsert: true });
        }
        return res.status(200).json({ message: 'Messages synchronized successfully' });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
});
exports.default = ContactController;
//# sourceMappingURL=contact.controller.js.map