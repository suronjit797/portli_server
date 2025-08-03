import { generateCrudRoutes } from "express-easy-curd";
import ImagesModel from "./images.model";
import { setUserToBody } from "../../global/globalMiddleware";
import { validatorMiddleware } from "../../middleware/zodValidator";
import { imageZodSchema } from "./images.validation";
import { globalQueryZodSchema } from "../../global/globalValidator";

const imageRouter = generateCrudRoutes({
  mongooseModel: ImagesModel,
  name: "Images",
  middlewares: {
    create: [setUserToBody],
    removeMany: [validatorMiddleware(globalQueryZodSchema)],
    updateMany: [validatorMiddleware(globalQueryZodSchema)],
    update: [validatorMiddleware(imageZodSchema)],
    // remove: [validatorMiddleware(imageZodSchema)],
  },
});

export default imageRouter;
