import mongoose, { Schema, type Document } from "mongoose";

export interface MessageInterface extends Document {
    content: string,
    createdAt: Date,
}

export const MessageSchema: Schema<MessageInterface> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const MessageModel = mongoose.models.Message as mongoose.Model<MessageInterface> || mongoose.model<MessageInterface>('Message', MessageSchema)

export { MessageModel }