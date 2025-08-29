import { z } from 'zod';

const userNameValidation = z
    .string()
    .min(2, { error: 'Username should be atleast 2 characters' })
    .max(20, { error: 'Username should be less than 20 characters' });

const emailValidation = z
    .email()
    .regex(/.+\@.+\..+/, { error: 'Email should be valid' });

const passwordValidation = z
    .string()
    .min(6, { error: 'Password must be atleast 6 characters' })


export const signUpSchema = z.object({
    username: userNameValidation,
    email: emailValidation,
    password: passwordValidation
})