"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
}
IndexController.index = (req, res, next) => {
    res.render("pages/home", {
        title: "Home Page!"
    });
};
IndexController.about = (req, res, next) => {
    res.render("pages/about", {
        title: "About Page"
    });
};
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map