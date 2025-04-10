import globalService from "../../global/global.service";
import TemplateModel from "./template.model";
import { Readable } from "stream";


const globalServices = globalService(TemplateModel);


const templateService = { ...globalServices };

export default templateService;
