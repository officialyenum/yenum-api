import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Contact from '../../models/Contact';

class ContactController {
    public static index = async (req: Request, res: Response, next: NextFunction) => {
        return Contact.find()
            .select('-__v')
            .then((games) => res.status(200).json({ games }))
            .catch((err) => res.status(500).json({ err }));
    };

    public static create = (req: Request, res: Response, next: NextFunction) => {
        const contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            content: req.body.title,
            published: 0
        });
        return contact
            .save()
            .then((newContact) => res.status(201).json({ newContact }))
            .catch((err) => res.status(500).json({ err }));
    };

    public static show = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return Contact.findById(gameId)
            .select('-__v')
            .then((contact) => (contact ? res.status(200).json({ contact }) : res.status(404).json({ message: 'Message not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    public static update = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return Contact.findById(gameId)
            .then((updatedContact) => {
                if (updatedContact) {
                    updatedContact.set(req.body);
                    return updatedContact
                        .save()
                        .then((newContact) => res.status(201).json({ newContact }))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: 'Game not found' });
                }
            })
            .catch((err) => res.status(500).json({ err }));
    };

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return Contact.findByIdAndDelete(gameId)
            .then((contact) => (contact ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Contact not found' })))
            .catch((err) => res.status(500).json({ err }));
    };
}

export default ContactController;
