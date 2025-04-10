import { z } from "zod";


export const templateZodSchema = z.object({
  body: z.object({
    hero: z.string().optional(),
    about: z.string().optional(),
    contact: z.string().optional(),
    service: z.string().optional(),
    work: z.string().optional(),
    experience: z.string().optional(),
    blog: z.string().optional(),
  }),
});
