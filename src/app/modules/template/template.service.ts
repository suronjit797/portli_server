import { RequestHandler } from "express";
import globalService from "../../global/global.service";
import TemplateModel from "./template.model";
import sendRes from "../../../shared/sendResponse";

const globalServices = globalService(TemplateModel);

const create: RequestHandler = (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = TemplateModel.create({ ...req.body, user: _id });
    const payload = {
      success: true,
      message: "Template create successfully",
      data,
    };
    sendRes(res, 201, payload);
  } catch (error) {
    next(error);
  }
};

const templateService = { ...globalServices, create };

export default templateService;
