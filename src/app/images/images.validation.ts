import { z } from "zod";
import { globalImageValidator } from "../../global/globalValidator";

export const imageZodSchema = z.object({
  body: z.object({
    image: globalImageValidator,
  }),
});
