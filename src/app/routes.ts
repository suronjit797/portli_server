import express from "express";
import userRouter from "./user/user.routes";
import templateRouter from "./template/template.routes";
import packageRouter from "./package/package.routes";
import subscriptionRouter from "./subscription/subscription.routes";
import { auth } from "../middleware/auth";

const router = express.Router();

const moduleRoute = [
  { path: "/users", routes: userRouter, auth: false },
  { path: "/template", routes: templateRouter, auth: false },
  { path: "/package", routes: packageRouter, auth: false },
  { path: "/subscription", routes: subscriptionRouter, auth: false },
];

moduleRoute.forEach((route) =>
  route?.auth ? router.use(route.path, auth(), route.routes) : router.use(route.path, route.routes)
);

export default router;


// // image upload
// router.post("/upload", uploadCloudinary.single("photo"), (req, res, next) => {
//   try {
//     const data = {
//       uid: req.file?.filename,
//       name: req.file?.filename.split("/").pop() + ".webp",
//       url: req.file?.path,
//       size: req.file?.size,
//     };

//     res.send({
//       success: true,
//       message: "File uploaded successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;
