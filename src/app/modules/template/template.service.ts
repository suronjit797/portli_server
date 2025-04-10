import { Request } from "express";
import globalService from "../../global/global.service";
import TemplateModel from "./template.model";

const globalServices = globalService(TemplateModel);


const templateService = { ...globalServices };

export default templateService;
