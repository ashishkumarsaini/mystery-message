import { dbConnect } from "@/lib/database/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, verifyCode } = await request.json();

        const existingUserByUserName = await UserModel.findOne({ username });

        if (!existingUserByUserName) {
            return Response.json({
                success: false,
                message: 'User not found',
            }, {
                status: 400
            });
        }

        const { verifyCode: existingVerifyCode, verifyCodeExpiry: existingVerifyCodeExpiry } = existingUserByUserName;

        if (existingVerifyCode === verifyCode && existingVerifyCodeExpiry) {
            const isCodeNotExpired = new Date(existingVerifyCodeExpiry) > new Date();

            if (isCodeNotExpired) {
                existingUserByUserName.isVerified = true;
                existingUserByUserName.isAcceptingMessage = true;

                await existingUserByUserName.save();

                return Response.json({
                    success: true,
                    message: 'Account verified successfully',
                }, {
                    status: 200
                });
            }

            return Response.json({
                success: false,
                message: 'Verification Code Expired, Please signup again',
            }, {
                status: 400
            });
        }

        return Response.json({
            success: false,
            message: 'Code is invalid',
        }, {
            status: 400
        });
    } catch (error) {
        console.log('Error verifying code', { error });
        return Response.json({
            success: false,
            message: 'Error verifying code',
        }, {
            status: 500
        });
    }
}
