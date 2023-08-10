import mongoose, { Document, Schema } from 'mongoose';

export interface IContact {
    name: string;
    email: string;
    project: string;
    message: string;
    sent_date: Date;
}

export interface IContactModel extends Document, IContact {}

const ContactSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        project: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        sent_date: {
            type: Date,
            nullable: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IContactModel>('Contact', ContactSchema);
