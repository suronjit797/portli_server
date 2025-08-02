import express from "express";
import { auth } from "../../middleware/auth";
import userController from "./user.controller";
import { userCreateValidationZod, userLoginValidationZod, userUpdateValidationZod } from "./user.validation";
import { validatorMiddleware } from "../../middleware/zodValidator";
import { generateCurdController } from "express-easy-curd";
import UserModel from "./user.model";
import redis from "../../config/redis";

const userRouter = express.Router();
// const { admin, student } = userRole;

const userGlobalController = generateCurdController(UserModel, "user", redis, 600);

// auth
userRouter.post("/register", validatorMiddleware(userCreateValidationZod), userGlobalController.create);
userRouter.post("/login", validatorMiddleware(userLoginValidationZod), userController.loginUser);

// profile of login user
userRouter.get("/profile", auth(), userController.getProfile);
userRouter.put("/profile", auth(), userController.updateProfile);

// user
userRouter.get("/", userGlobalController.getAll);
userRouter.get("/:id", auth(), userGlobalController.getSingle);
userRouter.put("/:id", auth(), validatorMiddleware(userUpdateValidationZod), userGlobalController.update);
userRouter.delete("/:id", auth(), userGlobalController.remove);

export default userRouter;
