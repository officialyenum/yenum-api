import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Contact from '../../models/Contact';
import axios, { AxiosResponse } from 'axios';
import transporter from '../../services/mail-transporter';

class ContactController {
    public static index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Contact.find();
            res.status(200).json({data});
        } catch (error: any) {
            res.status(500).json({ err: error.message });
        }

    };

    public static show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Contact.findById(req.params.id).select('-__v')
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
            const contact = await new Contact({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                project: req.body.project,
                message: req.body.message,
                sent_date: Date.now(),
            });
            const msg = {
                to: "oponechukwuyenum@gmail.com",
                from: "admin@chuckymagic.com",
                subject: contact.project,
                html: `<p>Name : ${contact.name},</p></br><p>Email : ${contact.email},</p></br><p>Message: ${contact.message}!</p>`
              };
            const resp: any = await transporter.send(msg);
            console.log(resp);
            await contact.save();
            return res.status(201).json({
                contact
            });
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                return res.status(400).json({ err: error.response.body });
            }
            return res.status(500).json({ err: error.message });
        }
    };

    public static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedContact = await Contact.findById(req.params.id);
            if (updatedContact) {
                updatedContact.set(req.body);
                await updatedContact.save()
                return res.status(201).json({ updatedContact });
            } else {
                throw new Error("Not found");
            }
        } catch (error: any) {
            res.status(500).json({ err: error.message });
        }
    };

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        const gameId = req.params.id;
        return Contact.findByIdAndDelete(gameId)
            .then((post) => (post ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Game not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    public static sync = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data, status } = await axios.get(
                'https://dashboard.yenum.dev/api/contact',
                {
                  headers: {
                    Accept: 'application/json',
                  },
                },
            );
            const messagesToCreateOrUpdate = data.data.map((contact: any) => ({
                name: contact.name,
                email: contact.email,
                project: contact.project,
                message: contact.message,
                sent_date: contact.created_at,
            }));
            for (const messageData of messagesToCreateOrUpdate) {
                await Contact.findOneAndUpdate(
                    { email: messageData.email },
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

export default ContactController;
