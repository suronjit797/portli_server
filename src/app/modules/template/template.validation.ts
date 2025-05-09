import { z } from "zod";
import { globalContentValidator } from "../../global/globalValidator";

const heroComponentsSchema = z
  .object({
    type: z.string().optional(),
    content: globalContentValidator,
    styles: z.record(z.string()).optional(),
  })
  .optional();

export const templateZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    rating: z.number().optional(),
    themeUser: z.number().optional(),
    user: z.string().optional(),
    isAdminTemplate: z.string().optional(),

    hero: z
      .object({
        styles: z.record(z.string()).optional(),
        hero_text: heroComponentsSchema,
        hero_textGroup: heroComponentsSchema,
        hero_button: heroComponentsSchema,
        hero_image: heroComponentsSchema,
        hero_designation: heroComponentsSchema,
        hero_description: heroComponentsSchema,
      })
      .optional(),
    // about: z.string().optional(),
    // contact: z.string().optional(),
    // service: z.string().optional(),
    // work: z.string().optional(),
    // experience: z.string().optional(),
    // blog: z.string().optional(),
  }),
});
