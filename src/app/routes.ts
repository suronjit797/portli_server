import express from "express";
import userRouter from "./modules/user/user.routes";
import { auth } from "./middleware/auth";
import heroSectionRouter from "./modules/heroSection/heroSection.routes";
import templateRouter from "./modules/template/template.routes";

const router = express.Router();

const moduleRoute = [
  { path: "/users", routes: userRouter, auth: false },
  { path: "/hero", routes: heroSectionRouter, auth: false },
  { path: "/template", routes: templateRouter, auth: false },
];

moduleRoute.forEach((route) =>
  route?.auth ? router.use(route.path, auth(), route.routes) : router.use(route.path, route.routes)
);

// upload
// router.post("/upload", auth(), upload.single("photos"), uploadToBunny);

export default router;
