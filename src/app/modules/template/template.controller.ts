import { RequestHandler } from "express";
import globalController from "../../global/global.controller";

import TemplateService from "./template.service";
import sendRes from "../../../shared/sendResponse";
import httpStatus from "http-status";

// variables
const name = "Template";
// global
const globalControllers = globalController(TemplateService, name);

const create: RequestHandler = async (req, res, next) => {
  try {
    const data = await TemplateService.create(req);

    const payload = {
      success: true,
      message: `${name} created successfully`,
      data,
    };
    sendRes(res, httpStatus.CREATED, payload);
    return;
  } catch (error) {
    next(error);
  }
};

const TemplateController = { ...globalControllers, create };
export default TemplateController;
