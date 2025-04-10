import globalController from "../../global/global.controller";

import TemplateService from "./template.service";

// variables
const name = "Template";
// global
const globalControllers = globalController(TemplateService, name);



const TemplateController = { ...globalControllers};
export default TemplateController;
