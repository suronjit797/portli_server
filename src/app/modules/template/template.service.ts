import { RequestHandler } from "express";
import globalService from "../../global/global.service";
import TemplateModel from "./template.model";
import sendRes from "../../../shared/sendResponse";

const globalServices = globalService(TemplateModel);

const create: RequestHandler = (req) => {
  const { _id, role } = req.user;
  return TemplateModel.create({ ...req.body, user: _id, isAdminTemplate: role === "admin" });
};

const templateService = { ...globalServices, create };

export default templateService;
