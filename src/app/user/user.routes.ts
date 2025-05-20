import express from "express";
import { auth } from "../../middleware/auth";
import userController from "./user.controller";
import { userCreateValidationZod, userLoginValidationZod, userUpdateValidationZod } from "./user.validation";
import { validatorMiddleware } from "../../middleware/zodValidator";

const userRouter = express.Router();
// const { admin, student } = userRole;

// auth
userRouter.post("/register", validatorMiddleware(userCreateValidationZod), userController.create);
userRouter.post("/login", validatorMiddleware(userLoginValidationZod), userController.loginUser);

// profile of login user
userRouter.get("/profile", auth(), userController.getProfile);
userRouter.put("/profile", auth(), userController.updateProfile);

// user
userRouter.get("/", userController.getAll);
userRouter.get("/:id", auth(), userController.getSingle);
userRouter.put("/:id", auth(), validatorMiddleware(userUpdateValidationZod), userController.update);
userRouter.delete("/:id", auth(), userController.remove);

export default userRouter;
