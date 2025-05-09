import globalController from "../../global/global.controller";

import PackageService from "./package.service";

// variables
const name = "Package";

// global
const globalControllers = globalController(PackageService, name);

const PackageController = { ...globalControllers };
export default PackageController;
