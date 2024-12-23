import { z } from "zod";

export const transactionCreateValidate = z.object({
  body: z.object({
    title: z.string(),
    type: z.string(),
    amount: z.number(),
    isPending: z.boolean(),
  }),
});

export const transactionUpdateValidate = z.object({
  body: z.object({
    title: z.string().optional(),
    type: z.string().optional(),
    amount: z.number().optional(),
    isPending: z.boolean().optional(),
  }),
});
