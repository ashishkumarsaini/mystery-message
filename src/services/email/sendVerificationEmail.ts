import { resend } from '@/lib/email/resend';
import { VerificationEmailResponse } from '@/types/ApiResponse';
import { VerificationEmailTemplate } from '../../../emails/VerificationEmail';

export const sendVerificationEmail = async (email: string, verifyCode: string): Promise<VerificationEmailResponse> => {
    try {
        const { error } = await resend.emails.send({
            from: '<onboarding@resend.dev>',
            to: email,
            subject: 'Mystery Message | Verification for SignUp',
            react: VerificationEmailTemplate({ email, verifyCode }),
        });

        if (error) {
            return { message: 'Error while sending verification email', success: false }
        }

        return { message: 'Verification Email sent successfully!', success: true };
    } catch (error) {
        console.log('Error while sending verification email', { error });
        return { message: 'Error while sending verification email', success: false }
    }
}