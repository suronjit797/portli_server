import express from "express";
import userRouter from "./modules/user/user.routes";
import { auth } from "./middleware/auth";
import templateRouter from "./modules/template/template.routes";
import packageRouter from "./modules/package/package.routes";
import subscriptionRouter from "./modules/subscription/subscription.routes";

const router = express.Router();

const moduleRoute = [
  { path: "/users", routes: userRouter, auth: false },
  { path: "/template", routes: templateRouter, auth: true },
  { path: "/package", routes: packageRouter, auth: true },
  { path: "/subscription", routes: subscriptionRouter, auth: true },
];

moduleRoute.forEach((route) =>
  route?.auth ? router.use(route.path, auth(), route.routes) : router.use(route.path, route.routes)
);

// upload
// router.post("/upload", auth(), upload.single("photos"), uploadToBunny);

export default router;
