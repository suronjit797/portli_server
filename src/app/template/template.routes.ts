import express, { RequestHandler } from "express";

import templateController from "./template.controller";
import { templateZodSchema } from "./template.validation";
import { auth } from "../../middleware/auth";
import { userRole } from "../../shared/constant";
import { validatorMiddleware } from "../../middleware/zodValidator";

const templateRouter = express.Router();
const { admin } = userRole;

const partialFilterMiddlewares: RequestHandler = (req, res, next) => {
  req.partialFilter = ["name", "email", "role"];
  next();
};

// template
templateRouter.get("/", partialFilterMiddlewares, templateController.getAll);
templateRouter.post("/", auth(), validatorMiddleware(templateZodSchema), templateController.create);
templateRouter.get("/:id", templateController.getSingle);
templateRouter.put("/:id", auth(), validatorMiddleware(templateZodSchema), templateController.update);
templateRouter.delete("/:id", templateController.remove);

export default templateRouter;
