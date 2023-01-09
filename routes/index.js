const router = require("express").Router();
const indexController = require("../controllers/index");
const gameController = require("../controllers/game");
const response = require("../utils/response");

// Home
router.get("/", indexController.index);

//Game
router.get("/api/games", gameController.index);
router.post('/api/games', gameController.create);
router.patch('/api/games/:id', gameController.update);
router.get('/api/games/:id', gameController.show);
router.delete('/api/games/:id', gameController.delete);

//REGISTER
// router.post("/register", userController.register);

//Login
// router.post("/login", userController.login);

module.exports = router;
