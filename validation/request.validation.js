import { z } from 'zod';

export const signUpPostRequestBodySchema = z.object({
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.email(),
    password: z.string().min(6),
});

export const loginPostRequestBodySchema = z.object({
    email: z.email(),
    password: z.string().min(8),
})

export const shortenPostRequestBodySchema 
= z.object(
    {
        url: z.url(),
        code: z.string().optional(),
    }
);
