import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import { IUser } from '../models/User';
import { IGame } from '../models/Game';
import { IContact } from '../models/Contact';
import { IAnonymousMessage } from '../models/AnonymousMessage';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err: any) {
            Logging.error(err);
            const errors =  err.details.map((error:any) => {
                return { message: error.message, field: error.context.label};
            })
            return res.status(422).json({errors});
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
    },
    anonymousMessage: {
        get: Joi.object({
            published: Joi.array().items(Joi.number().integer().valid(0, 1)).min(1).max(2).unique()
        }),
        create: Joi.object<IAnonymousMessage>({
            content: Joi.string().required(),
        }),
        update: Joi.object<IAnonymousMessage>({
            content: Joi.string().required(),
        })
    },
    contact: {
        create: Joi.object<IContact>({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            project: Joi.string().required(),
            message: Joi.string().required(),
        }),
        update: Joi.object<IContact>({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            project: Joi.string().required(),
            message: Joi.string().required(),
        })
    }
};
