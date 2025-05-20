import { z } from "zod";

export const subscriptionZodSchema = z.object({
  body: z.object({
    package: z.string(),
    user: z.string(),
    status: z.boolean().optional(),
  }),
});

export const subscriptionUpdateZodSchema = z.object({
  body: z.object({
    package: z.string().optional(),
    user: z.string().optional(),
    status: z.boolean().optional(),
  }),
});
