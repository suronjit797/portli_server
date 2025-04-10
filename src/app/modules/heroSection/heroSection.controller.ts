import { RequestHandler } from "express";
import httpStatus from "http-status";
import globalController from "../../global/global.controller";

import sendResponse from "../../../shared/sendResponse";
import HeroSectionService from "./heroSection.service";
import ApiError from "../../../ApiError";

// variables
const name = "HeroSection";
// global
const globalControllers = globalController(HeroSectionService, name);



const HeroSectionController = { ...globalControllers};
export default HeroSectionController;
