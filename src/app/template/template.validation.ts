import { z } from "zod";
import { globalTemplateSectionsValidator } from "../../global/globalValidator";

export const templateZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    ratings: z.number().optional(),
    themeUser: z.number().optional(),
    user: z.string().optional(),
    variants: z
      .array(
        z
          .object({
            name: z.string().optional(),
            value: z.string().optional(),
            colors: z.array(z.string().optional()).optional(),
          })
          .optional(),
      )
      .optional(),
    // isAdminTemplate: z.string().optional(),

    header: globalTemplateSectionsValidator,
    hero: globalTemplateSectionsValidator,
    about: globalTemplateSectionsValidator,
    contact: globalTemplateSectionsValidator,
    services: globalTemplateSectionsValidator,
    portfolio: globalTemplateSectionsValidator,
    footer: globalTemplateSectionsValidator,
    blog: globalTemplateSectionsValidator,
  }),
});
