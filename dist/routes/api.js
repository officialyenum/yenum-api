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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controllers/api/index.controller"));
const ai21_1 = require("@officialyenum/ai21");
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const game_route_1 = __importDefault(require("./game.route"));
const anonymous_message_route_1 = __importDefault(require("./anonymous-message.route"));
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
// Game routes
router.use('/anonymous-message', anonymous_message_route_1.default);
router.get('/ai', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = process.env.AI21_TOKEN;
    const ai = new ai21_1.AI21(token);
    const data = {
        text: "La Taqueria is a tiny place with 3 long tables inside and 2 small tables outside. The inside is cramped, but the outside is pleasant. Unfortunately, we had to sit inside as all the outside tables were taken. The tacos are delicious and reasonably priced and the salsa is spicy and flavorful. Service was friendly. Aside from the seating, the only thing I didn't like was the lack of parking - we had to walk six blocks to find a spot",
        style: "general", // financial_report, academic_paper, wikipedia_article
    };
    const resp = yield ai.paraphrase(data);
    console.log(resp);
    // {
    //     "status": "success",
    //     "message": "Summaries Retrieved Successfully",
    //     "data": [
    //       {
    //         "text": "Olives, wheat and grapes have been the staple foods of the Mediterranean world, with seafood as the preferred protein source.\nThis paper reviews how seafood has been present in the dietary practices of the Mediterranean people since ancient Egyptians up to the gastronomic discourse of some celebrated contemporary chefs.\nSome contemporary celebrity chefs are not fully aware of the rich Mediterranean culinary heritage."
    //       }
    //     ]
    //  }
    return res.status(200).json(resp);
}));
exports.default = router;
//# sourceMappingURL=api.js.map