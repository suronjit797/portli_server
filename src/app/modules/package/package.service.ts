import { Request } from "express";
import globalService from "../../global/global.service";
import PackageModel from "./package.model";

const globalServices = globalService(PackageModel);

const packageService = { ...globalServices };

export default packageService;
