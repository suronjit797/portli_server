import { z } from "zod";

export const templateZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    rating: z.number().optional(),
    themeUser: z.number().optional(),
    user: z.string().optional(),
    isAdminTemplate: z.string().optional(),

    hero: z.string().optional(),
    about: z.string().optional(),
    contact: z.string().optional(),
    service: z.string().optional(),
    work: z.string().optional(),
    experience: z.string().optional(),
    blog: z.string().optional(),
  }),
});
