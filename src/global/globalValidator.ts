import { z } from "zod";

export const globalImageValidator = z
  .object({
    uid: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    url: z.string().optional(),
    size: z.number().optional(),
  })
  .optional();

export const globalContentValidator = z
  .object({
    text: z.string().optional(),
    url: z.string().optional(),
    elements: z.array(z.any()).optional(),
  })
  .optional();

export const componentsSchemaValidator = z
  .object({
    type: z.string().optional(),
    content: globalContentValidator,
    styles: z.string().optional(),
  })
  .optional();

export const globalTemplateSectionsValidator = z
  .object({
    styles: z.any().optional(),
    // text: componentsSchemaValidator,
    // textGroup: componentsSchemaValidator,
    // button: componentsSchemaValidator,
    // image: componentsSchemaValidator,
    // designation: componentsSchemaValidator,
    // description: componentsSchemaValidator,
    heading_secondary: componentsSchemaValidator,
    text_primary: componentsSchemaValidator,
    text_secondary: componentsSchemaValidator,
    image: componentsSchemaValidator,
    background_image: componentsSchemaValidator,
    description_primary: componentsSchemaValidator,
    description_secondary: componentsSchemaValidator,
    icon: componentsSchemaValidator,
    multiple_items: componentsSchemaValidator,
  })
  .optional();

export const globalQueryZodSchema = z.object({
  query: z.object().refine((data) => Object.keys(data).length > 0, {
    message: "At least one query field must be provided",
  }),
});
