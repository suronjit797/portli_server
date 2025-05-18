import { RequestHandler } from "express";
import globalController from "../../global/global.controller";

import SubscriptionService from "./subscription.service";
import httpStatus from "http-status";
import sendRes from "../../../shared/sendResponse";
import PackageModel from "../package/package.model";
import ApiError from "../../../ApiError";
import dayjs, { ManipulateType } from "dayjs";
import SubscriptionModel from "./subscription.model";
import UserModel from "../user/user.model";
import { TPackage } from "../package/package.interface";
import { userRole } from "../../../constants/userConstants";

// variables
const name = "Subscription";

// global
const globalControllers = globalController(SubscriptionService, name);

const create: RequestHandler = async (req, res, next) => {
  try {
    const { package: packageId, user: userId } = req.body;
    const findPackage = await PackageModel.findById(packageId);
    const findUser = await UserModel.findById(userId);

    if (!findPackage) throw new ApiError(httpStatus.NOT_FOUND, "Invalid package");
    if (!findUser) throw new ApiError(httpStatus.NOT_FOUND, "Invalid user");

    const { duration, durationUnit } = findPackage;
    const expireDate = dayjs()
      .add(duration || 1, (durationUnit as ManipulateType) || "day")
      .toDate();

    const body = { ...req.body, expireDate };

    if ([userRole.admin, userRole.superAdmin].includes(req.user.role)) {
      body.assignBy = req.user._id;
    }

    const existing = await SubscriptionModel.findOne({ user: userId });

    let data;
    if (existing) {
      data = await SubscriptionModel.findByIdAndUpdate(existing._id, body, { new: true });
    } else {
      data = await SubscriptionModel.create(body);
    }

    if (findPackage) {
      PackageModel.findByIdAndUpdate(
        findPackage._id,
        {
          ...findPackage,
          totalUser: findPackage.totalUser + 1,
        },
        { new: true }
      );
    }

    const payload = {
      success: true,
      message: `${name} ${existing ? "updated" : "created"} successfully`,
      data,
    };
    sendRes(res, httpStatus.CREATED, payload);
  } catch (error) {
    next(error);
  }
};

const SubscriptionController = { ...globalControllers, create };
export default SubscriptionController;
