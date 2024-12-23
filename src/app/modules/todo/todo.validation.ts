import { z } from "zod";

export const todoCreateValidate = z.object({
  body: z.object({
    title: z.string(),
    isDone: z.boolean().optional(),
    isImportant: z.boolean().optional(),
  }),
});

export const todoUpdateValidate = z.object({
  body: z.object({
    title: z.string().optional(),
    isDone: z.boolean().optional(),
    isImportant: z.boolean().optional(),
  }),
});
