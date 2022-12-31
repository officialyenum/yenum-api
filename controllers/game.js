const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
const Game = require('../models/Game');

exports.index = async (req, res, next) => {
    return Game.find()
        .select('-__v')
        .then((games) => res.status(200).json({ games }))
        .catch((err) => res.status(500).json({ err }));
};
exports.create = (req, res, next) => {
    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
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

exports.show = (req, res, next) => {
    const gameId = req.params.id;
    console.log(req.params);
    console.log(req.param)
    return Game.findById(gameId)
        .select('-__v')
        .then((game) => (game ? res.status(200).json({ game }) : res.status(404).json({ message: 'Game not found' })))
        .catch((err) => res.status(500).json({ err }));
};

exports.update = (req, res, next) => {
    // const gameId = req.params.id;
    return Game.findById(req.params.id)
        .then((updatedGame) => {
            if (updatedGame) {
                updatedGame.set(req.body);
                return updatedGame
                    .save()
                    .then((newGame) => res.status(201).json({ newGame }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Game not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

exports.delete = (req, res, next) => {
    const gameId = req.params.id;
    return Game.findByIdAndDelete(gameId)
        .then((post) => (post ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Game not found' })))
        .catch((err) => res.status(500).json({ err }));
};
