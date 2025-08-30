import { dbConnect } from "@/lib/database/dbConnect";
import { UserModel } from "@/model/User";
import { sendVerificationEmail } from "@/services/email/sendVerificationEmail";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return Response.json({
            success: false,
            message: 'Method not allowed',
        }, {
            status: 405
        });
    }

    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingVerifiedUserByUsername = await UserModel.findOne({ username, isVerified: true });

        if (existingVerifiedUserByUsername) {
            return Response.json({
                success: false,
                message: 'Username already registered with this username'
            }, {
                status: 500
            })
        }

        const existingVerifiedUserByEmail = await UserModel.findOne({ email });
        const verifyCode = (Math.floor(100000 + Math.random() * 900000)).toString();

        if (existingVerifiedUserByEmail) {
            if (existingVerifiedUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: 'Username already registered with this email'
                }, {
                    status: 500
                })
            }

            const hasedPassword = await bcrypt.hash(password, 10);
            existingVerifiedUserByEmail.password = hasedPassword;
            existingVerifiedUserByEmail.verifyCode = verifyCode;
            existingVerifiedUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        } else {
            const hasedPassword = await bcrypt.hash(password, 10);

            const verifyCodeExpiry = new Date();
            verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry,
                isVerified: false,
                isAcceptingMessage: false,
                messages: []
            });

            newUser.save();
        }

        const emailResponse = await sendVerificationEmail(email, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User registered successfully! Please vefify your email"
        }, { status: 201 })


    } catch (error) {
        console.log('Error registering user', { error });
        return Response.json({
            success: false,
            message: 'Error registering user',
        }, {
            status: 500
        })
    }
}