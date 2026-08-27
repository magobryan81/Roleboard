import { z } from "zod";

const nameSchema = z.string();
const email = z.string().email().min(10).max(255);

export const updateNameSchema = z.object({
    name: nameSchema,
});

export const updateEmailSchema = z.object({
    newEmail: email,
})
