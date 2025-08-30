import { dbConnect } from "@/lib/database/dbConnect";
import { UserModel } from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import z from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation
});

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get('username')
        }
        const { success, data } = UsernameQuerySchema.safeParse(queryParams);
        if (!success) {
            return Response.json({
                success: false,
                message: 'Invalid username format',
            }, {
                status: 400
            });
        }

        if (data) {
            const existingVerifiedUserByUsername = await UserModel.findOne({
                username: data.username,
                isVerified: true
            });

            if (existingVerifiedUserByUsername) {
                return Response.json({
                    success: false,
                    message: 'Username is already taken',
                }, {
                    status: 400
                });
            }

            return Response.json({
                success: true,
                message: 'Username is available',
            }, { status: 200 });
        }

        return Response.json({
            success: false,
            message: 'Username is required',
        }, {
            status: 400
        });
    } catch (error) {
        console.log('Error checking username uniqueness', { error });
        return Response.json({
            success: false,
            message: 'Error checking username uniqueness',
        }, {
            status: 500
        })
    }
}
