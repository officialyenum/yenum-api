import mongoose, { Document, Schema } from 'mongoose';

export interface IAnonymousMessage {
    published: number;
    content: string;
}

export interface IAnonymousMessageModel extends Document, IAnonymousMessage {}

const AnonymousMessageSchema: Schema = new Schema(
    {
        published: {
            type: Number,
            default: 0
        },
        content: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAnonymousMessageModel>('AnonymousMessage', AnonymousMessageSchema);
