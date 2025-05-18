import { z } from "zod";

export const subscriptionZodSchema = z.object({
  body: z.object({
    package: z.string(),
    user: z.string(),
    status: z.boolean().optional(),
  }),
});
