import mongoose, { Document, Schema } from 'mongoose';

export interface IGame {
    name: string;
    email: string;
    project: string;
    message: string;
}

export interface IGameModel extends Document, IGame {}

const GameSchema: Schema = new Schema(
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
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IGameModel>('Game', GameSchema);
