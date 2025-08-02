import express from "express";
import userRouter from "./user/user.routes";
import templateRouter from "./template/template.routes";
import packageRouter from "./package/package.routes";
import subscriptionRouter from "./subscription/subscription.routes";
import { auth } from "../middleware/auth";
import { uploadCloudinary } from "../utils/uploadToCloudinary";
import imageRouter from "./images/images.routes";
import ImagesModel from "./images/images.model";

const router = express.Router();

const moduleRoute = [
  { path: "/users", routes: userRouter, auth: false },
  { path: "/template", routes: templateRouter, auth: false },
  { path: "/package", routes: packageRouter, auth: false },
  { path: "/subscription", routes: subscriptionRouter, auth: false },
  { path: "/images", routes: imageRouter, auth: true },
];

moduleRoute.forEach((route) =>
  route?.auth ? router.use(route.path, auth(), route.routes) : router.use(route.path, route.routes),
);

// image upload
router.post("/upload", auth(), uploadCloudinary.single("photo"), async (req, res, next) => {
  try {
    const data = {
      uid: req.file?.filename,
      name: req.file?.filename.split("/").pop() + ".webp",
      url: req.file?.path,
      size: req.file?.size,
    };
    await ImagesModel.create({ user: req.user._id, image: data });

    res.send({
      success: true,
      message: "File uploaded successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
