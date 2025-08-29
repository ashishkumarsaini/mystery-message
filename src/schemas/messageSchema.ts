import z from "zod";

const messageValidator = z
    .string()
    .min(10, { error: 'Message must be atleast 10 characters' })
    .max(300, { error: 'Message must be less than 300 characters' })

export const messageSchema = z.object({
    content: messageValidator
})