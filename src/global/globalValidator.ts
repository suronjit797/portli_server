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
    text: componentsSchemaValidator,
    textGroup: componentsSchemaValidator,
    button: componentsSchemaValidator,
    image: componentsSchemaValidator,
    designation: componentsSchemaValidator,
    description: componentsSchemaValidator,
  })
  .optional();
