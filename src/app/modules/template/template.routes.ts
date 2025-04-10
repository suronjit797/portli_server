import express, { RequestHandler } from "express";
import { userRole } from "../../../shared/constant";
import { validatorMiddleware } from "../../middleware/validatorMiddleware";
import templateController from "./template.controller";
import { templateZodSchema } from "./template.validation";

const templateRouter = express.Router();
const { admin } = userRole;

const partialFilterMiddlewares: RequestHandler = (req, res, next) => {
  req.partialFilter = ["name", "email", "role"];
  next();
};

// template
templateRouter.get("/", partialFilterMiddlewares, templateController.getAll);
templateRouter.post("/", validatorMiddleware(templateZodSchema), templateController.create);
templateRouter.get("/:id", templateController.getSingle);
// templateRouter.put("/:id", validatorMiddleware(templateZodSchema), templateController.update);
templateRouter.delete("/:id", templateController.remove);

export default templateRouter;
