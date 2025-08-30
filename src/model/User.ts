import mongoose, { Schema, Document } from "mongoose";
import { MessageInterface, MessageSchema } from "./Message";



export interface UserInterface extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: MessageInterface[]
}

const UserSchema: Schema<UserInterface> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is rqeuired'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify code expiry']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify code expiry is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema]
})

const UserModel = mongoose.models.User as mongoose.Model<UserInterface> || mongoose.model<UserInterface>('User', UserSchema)

export { UserModel }