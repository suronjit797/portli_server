import { Request } from "express";
import globalService from "../../global/global.service";
import SubscriptionModel from "./subscription.model";

const globalServices = globalService(SubscriptionModel);

const subscriptionService = { ...globalServices };

export default subscriptionService;
