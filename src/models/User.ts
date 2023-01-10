import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
}

export interface IUserModel extends Document, IUser {}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<IUserModel>('User', UserSchema);
