import express, { RequestHandler } from "express";
import { userRole } from "../../../shared/constant";
import { validatorMiddleware } from "../../middleware/validatorMiddleware";
import heroSectionController from "./heroSection.controller";
import { heroSectionZodSchema } from "./heroSection.validation";

const heroSectionRouter = express.Router();
const { admin } = userRole;

const partialFilterMiddlewares: RequestHandler = (req, res, next) => {
  req.partialFilter = ["name", "email", "role"];
  next();
};

// heroSection
heroSectionRouter.get("/", partialFilterMiddlewares, heroSectionController.getAll);
heroSectionRouter.post("/", validatorMiddleware(heroSectionZodSchema), heroSectionController.create);
heroSectionRouter.get("/:id", heroSectionController.getSingle);
heroSectionRouter.put("/:id", validatorMiddleware(heroSectionZodSchema), heroSectionController.update);
heroSectionRouter.delete("/:id", heroSectionController.remove);

export default heroSectionRouter;
