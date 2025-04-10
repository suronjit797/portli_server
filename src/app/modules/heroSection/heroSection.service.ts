import globalService from "../../global/global.service";
import HeroSectionModel from "./heroSection.model";
import { Readable } from "stream";


const globalServices = globalService(HeroSectionModel);


const heroSectionService = { ...globalServices };

export default heroSectionService;
