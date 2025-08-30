import { dbConnect } from "@/lib/database/dbConnect";
import { authOptions } from "../../auth/options";
import { getServerSession } from "next-auth/next";
import { UserModel } from "@/model/User";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();

    try {
        const userSession = await getServerSession(authOptions);

        if (!userSession || !userSession.user) {
            return Response.json({
                success: false,
                message: 'Unauthorized',
            }, {
                status: 401
            });
        }

        const userId = new mongoose.Types.ObjectId(userSession.user._id);
        const existingUsersWithMessages = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        if (!existingUsersWithMessages || !existingUsersWithMessages.length) {
            return Response.json({
                success: false,
                message: 'User not found',
            }, {
                status: 404
            });
        }

        return Response.json({
            success: true,
            messages: existingUsersWithMessages[0].messages
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