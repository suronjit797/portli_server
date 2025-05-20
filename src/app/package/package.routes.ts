import express, { RequestHandler } from "express";

import packageController from "./package.controller";
import { packageZodSchema } from "./package.validation";
import { auth } from "../../middleware/auth";
import { userRole } from "../../shared/constant";
import { validatorMiddleware } from "../../middleware/zodValidator";

const packageRouter = express.Router();
const { admin } = userRole;

const partialFilterMiddlewares: RequestHandler = (req, res, next) => {
  req.partialFilter = ["name", "email", "role"];
  next();
};

// package
packageRouter.get("/", partialFilterMiddlewares, packageController.getAll);
packageRouter.post("/", auth(), validatorMiddleware(packageZodSchema), packageController.create);
packageRouter.get("/:id", packageController.getSingle);
packageRouter.put("/:id", auth(), validatorMiddleware(packageZodSchema), packageController.update);
packageRouter.delete("/:id", packageController.remove);

export default packageRouter;
