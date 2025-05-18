import { Request, RequestHandler } from "express";
import globalService from "../../global/global.service";
import SubscriptionModel from "./subscription.model";
import { TSubscription } from "./subscription.interface";
import PackageModel from "../package/package.model";

const globalServices = globalService(SubscriptionModel);

const create: RequestHandler = async (req, rest, next): Promise<TSubscription | undefined> => {
  try {
    const body = req.body;
    const activePackage = await PackageModel.findById(body.package);

    if (activePackage) {
      PackageModel.findByIdAndUpdate(
        activePackage._id,
        {
          ...activePackage,
          totalUser: activePackage.totalUser + 1,
        },
        { new: true }
      );
    }

    return await SubscriptionModel.create(body);
  } catch (error) {
    next(error);
    return undefined;
  }
};

const subscriptionService = { ...globalServices, create };

export default subscriptionService;
