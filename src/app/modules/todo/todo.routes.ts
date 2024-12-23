import express from "express";
import { todoCreateValidate, todoUpdateValidate } from "./todo.validation";
import { validatorMiddleware } from "../../middleware/validatorMiddleware";
// import { auth } from "../../../middleware/auth";
import todoController from "./todo.controller";
import { setUserToBody } from "./todo.middleware";

const todoRouter = express.Router();

todoRouter.post("/", validatorMiddleware(todoCreateValidate), setUserToBody, todoController.create);

todoRouter.get("/", todoController.getAll);

todoRouter.get("/:id", todoController.getSingle);
todoRouter.put("/:id", validatorMiddleware(todoUpdateValidate), todoController.update);
todoRouter.delete("/:id", todoController.remove);

export default todoRouter;
