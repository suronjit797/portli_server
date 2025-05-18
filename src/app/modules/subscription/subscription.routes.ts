import express, { RequestHandler } from "express";
import { userRole } from "../../../shared/constant";
import { validatorMiddleware } from "../../middleware/validatorMiddleware";
import subscriptionController from "./subscription.controller";
import { subscriptionUpdateZodSchema, subscriptionZodSchema } from "./subscription.validation";
import { auth } from "../../middleware/auth";

const subscriptionRouter = express.Router();
const { admin } = userRole;

const partialFilterMiddlewares: RequestHandler = (req, res, next) => {
  req.partialFilter = ["name", "email", "role"];
  next();
};

// subscription
subscriptionRouter.get("/", partialFilterMiddlewares, subscriptionController.getAll);
subscriptionRouter.post("/", auth(), validatorMiddleware(subscriptionZodSchema), subscriptionController.create);
subscriptionRouter.get("/:id", subscriptionController.getSingle);
subscriptionRouter.put("/:id", auth(), validatorMiddleware(subscriptionUpdateZodSchema), subscriptionController.update);
subscriptionRouter.delete("/:id", subscriptionController.remove);

export default subscriptionRouter;
