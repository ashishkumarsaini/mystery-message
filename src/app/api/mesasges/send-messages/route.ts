import { dbConnect } from "@/lib/database/dbConnect";
import { MessageModel } from "@/model/Message";
import { UserModel } from "@/model/User";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { username, message } = await request.json();

        const existingUserByUserName = await UserModel.findOne({ username });

        if (!existingUserByUserName) {
            return Response.json({
                success: false,
                message: 'User not found',
            }, {
                status: 404
            });
        }

        if (!existingUserByUserName.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: 'User is not accepting messages',
            }, {
                status: 403
            });
        }

        const messageModel = new MessageModel({ message });
        existingUserByUserName.messages.push(messageModel);

        const userWithSavedMessages = await existingUserByUserName.save();

        if (!userWithSavedMessages) {
            return Response.json({
                success: false,
                message: 'Failed to save message',
            }, {
                status: 500
            });
        }

        return Response.json({
            success: true,
            message: 'Message sent successfully',
            messages: userWithSavedMessages.messages
        }, {
            status: 200
        });
    } catch (error) {
        console.log('Failed to get messages:', { error });
        return Response.json({
            success: false,
            message: 'Failed to get messages',
        }, {
            status: 500
        });
    }
}