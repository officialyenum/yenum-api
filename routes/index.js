const router = require("express").Router();
const indexController = require("../controllers/index");
const gameController = require("../controllers/game");
const response = require("../utils/response");

//Game
router.get("/games", gameController.index);
router.post('/games', gameController.create);
router.patch('/games/:id', gameController.update);
router.get('/games/:id', gameController.show);
router.delete('/games/:id', gameController.delete);

//REGISTER
// router.post("/register", userController.register);

//Login
// router.post("/login", userController.login);

module.exports = router;
