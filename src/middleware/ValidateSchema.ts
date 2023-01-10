import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import { IUser } from '../models/User';
import { IGame } from '../models/Game';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            Logging.error(err);
            return res.status(422).json({
                message: err
            });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            username: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            username: Joi.string().required()
        })
    },
    game: {
        create: Joi.object<IGame>({
            title: Joi.string().required(),
            description: Joi.string().required(),
            url: Joi.string().required(),
            image_url: Joi.string().required(),
            tags: Joi.array().required()
        }),
        update: Joi.object<IGame>({
            title: Joi.string().required(),
            description: Joi.string().required(),
            url: Joi.string().required(),
            image_url: Joi.string().required(),
            tags: Joi.array().required()
        })
    }
};
