import { z } from "zod";

export const subscriptionZodSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    duration: z.number(),
    durationUnit: z.enum(["day", "month", "year"]).optional(),
    amount: z.number(),
    features: z.record(z.any()).optional(),
    user: z.string(),
  }),
});
