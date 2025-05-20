import globalController from "../../global/global.controller";
import PackageModel from "./package.model";

// variables
const name = "Package";

// global
const globalControllers = globalController(PackageModel, name);

const PackageController = { ...globalControllers };
export default PackageController;
