import { RequestHandler } from "express";
import globalController from "../../global/global.controller";

import TemplateService from "./template.service";
import sendRes from "../../../shared/sendResponse";
import httpStatus from "http-status";
import TemplateModel from "./template.model";

// variables
const name = "Template";
// global
const globalControllers = globalController(TemplateService, name);

const create: RequestHandler = async (req, res, next) => {
  try {
    const { _id, role } = req.user;
    const data = await TemplateModel.create({ ...req.body, user: _id, isAdminTemplate: role === "admin" });

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
