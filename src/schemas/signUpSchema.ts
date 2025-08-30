import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2, { error: 'Username should be atleast 2 characters' })
    .max(20, { error: 'Username should be less than 20 characters' });

export const emailValidation = z
    .email()
    .regex(/.+\@.+\..+/, { error: 'Email should be valid' });

export const passwordValidation = z
    .string()
    .min(6, { error: 'Password must be atleast 6 characters' })


export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation
})