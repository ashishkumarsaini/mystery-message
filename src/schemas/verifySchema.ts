import { z } from 'zod';

const codeVerification = z.string().length(6, { error: 'Verification code must be 6 digits' });

export const verifySchema = z.object({
    code: codeVerification
});