import { z } from "zod";

export const packageZodSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    duration: z.number(),
    amount: z.number(),
    features: z.array(z.any()).optional(),
    durationUnit: z.enum(["day", "month", "year"]).optional(),
  }),
});
