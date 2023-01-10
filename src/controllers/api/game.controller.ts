import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Game from '../../models/Game';

class GameController {
    public static index = async (req: Request, res: Response, next: NextFunction) => {
        return Game.find()
            .select('-__v')
            .then((games) => res.status(200).json({ games }))
            .catch((err) => res.status(500).json({ err }));
    };

    public static create = (req: Request, res: Response, next: NextFunction) => {
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

    public static show = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return Game.findById(gameId)
            .select('-__v')
            .then((game) => (game ? res.status(200).json({ game }) : res.status(404).json({ message: 'Game not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    public static update = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return Game.findById(gameId)
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

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return Game.findByIdAndDelete(gameId)
            .then((post) => (post ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Game not found' })))
            .catch((err) => res.status(500).json({ err }));
    };
}

export default GameController;
