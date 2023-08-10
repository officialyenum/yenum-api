import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import AnonymousMessage from '../../models/AnonymousMessage';
import axios, { AxiosResponse } from 'axios';

class AnonymousMessageController {
    public static index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await AnonymousMessage.find();
            const filteredData = await AnonymousMessage.find({
                published: { $in: req.body.published }
            });

            let publishedCount: number = 0;
            let unPublishedCount: number = 0;

            data.forEach(item => {
                if (item.published === 1) {
                    publishedCount++;
                } else {
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
        } catch (error: any) {
            res.status(500).json({ err: error.message });
        }

    };

    public static show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await AnonymousMessage.findById(req.params.id).select('-__v')
            if (!data) {
                throw new Error("Not Found");
            }
            res.status(200).json({ data });
        } catch (error: any) {
            res.status(500).json({ err: error.message });
        }
    };

    public static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const anonymousMessage = await new AnonymousMessage({
                _id: new mongoose.Types.ObjectId(),
                content: req.body.content,
                published: 0
            });
            await anonymousMessage.save();
            return res.status(201).json({ anonymousMessage });
        } catch (error: any) {
            res.status(500).json({ err: error.message });
        }
    };

    public static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedAnonymousMessage = await AnonymousMessage.findById(req.params.id);
            if (updatedAnonymousMessage) {
                updatedAnonymousMessage.set(req.body);
                await updatedAnonymousMessage.save()
                return res.status(201).json({ updatedAnonymousMessage });
            } else {
                throw new Error("Not found");
            }
        } catch (error: any) {
            res.status(500).json({ err: error.message });
        }
    };

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return AnonymousMessage.findByIdAndDelete(gameId)
            .then((post) => (post ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Game not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    public static sync = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data, status } = await axios.get(
                'https://dashboard.yenum.dev/api/anonymous-yellow/2/all',
                {
                  headers: {
                    Accept: 'application/json',
                  },
                },
            );
            const messagesToCreateOrUpdate = data.data.map((message: any) => ({
                content: message.content,
                published: message.published,
                old_createdAt: message.created_at,
                createdAt: message.created_at,
            }));
            for (const messageData of messagesToCreateOrUpdate) {
                await AnonymousMessage.findOneAndUpdate(
                    { content: messageData.content },
                    messageData,
                    { upsert: true }
                );
            }
            return res.status(200).json({ message: 'Messages synchronized successfully' });
        } catch (error: any) {
            res.status(500).json({ err: error.message });
        }

    };
}

export default AnonymousMessageController;
