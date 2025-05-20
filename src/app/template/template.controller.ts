import { RequestHandler } from "express";
import globalController from "../../global/global.controller";
import httpStatus from "http-status";
import TemplateModel from "./template.model";
import { userRole } from "../../shared/constant";
import sendResponse from "../../shared/sendResponse";

const { superAdmin, admin } = userRole;

// variables
const name = "Template";
// global
const globalControllers = globalController(TemplateModel, name);

const create: RequestHandler = async (req, res, next) => {
  try {
    const { _id, role } = req.user;
    const data = await TemplateModel.create({
      ...req.body,
      user: _id,
      isAdminTemplate: [admin, superAdmin].includes(role),
    });

    const payload = {
      success: true,
      message: `${name} created successfully`,
      data,
    };
    sendResponse(res, httpStatus.CREATED, payload);
    return;
  } catch (error) {
    next(error);
  }
};

const TemplateController = { ...globalControllers, create };
export default TemplateController;
