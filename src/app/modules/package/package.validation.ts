import { z } from "zod";

export const packageZodSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    duration: z.number(),
    amount: z.number(),
    features: z.record(z.any()).optional(),
  }),
});
