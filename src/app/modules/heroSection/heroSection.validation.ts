import { z } from "zod";
import { globalContentValidator } from "../../global/globalValidator";

const componentsSchema = z.object({
  type: z.string().optional(),
  content: globalContentValidator,
  styles: z.record(z.string()).optional(),
});

export const heroSectionZodSchema = z.object({
  body: z.object({
    styles: z.record(z.string()).optional(),
    hero_text: componentsSchema,
    hero_TextGroup: componentsSchema,
    hero_button: componentsSchema,
    hero_image: componentsSchema,
    hero_designation: componentsSchema,
    hero_description: componentsSchema,
  }),
});

