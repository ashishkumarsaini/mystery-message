import { dbConnect } from "@/lib/database/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/options";
import { UserModel } from "@/model/User";
import mongoose from "mongoose";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json({
                success: false,
                message: 'Unauthorized',
            }, {
                status: 401
            });
        }

        const userId = session.user._id;
        const { acceptMessages } = await request.json();

        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessage: acceptMessages
        }, {
            new: true
        });

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: 'Failed to update user status to accept messages',
            }, {
                status: 401
            });
        }

        return Response.json({
            success: true,
            message: 'Message acceptance status updated successfully',
        }, {
            status: 200
        });

    } catch (error) {
        console.log('Failed to update user status to accept messages:', { error });

        return Response.json({
            success: false,
            message: 'Failed to update user status to accept messages',
        }, {
            status: 500
        });
    }
}

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
        const existingUserByUserId = await UserModel.findById(userId);

        if (!existingUserByUserId) {
            return Response.json({
                success: false,
                message: 'User not found',
            }, {
                status: 404
            });
        }

        return Response.json({
            success: true,
            isAcceptingMessages: existingUserByUserId.isAcceptingMessage
        }, {
            status: 200
        });

    } catch (error) {
        console.log('Failed to get messages acceptance status:', { error });

        return Response.json({
            success: false,
            message: 'Failed to get messages acceptance status',
        }, {
            status: 500
        });
    }
}