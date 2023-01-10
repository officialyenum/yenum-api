import mongoose, { Document, Schema } from 'mongoose';

export interface IGame {
    title: string;
    description: string;
    url: string;
    image_url: string;
    tags: string[];
}

export interface IGameModel extends Document, IGame {}

const GameSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IGameModel>('Game', GameSchema);
