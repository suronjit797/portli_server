import { Model, ObjectId } from "mongoose";

export type TSubscription = {
  package: ObjectId;
  user: ObjectId;
  expireDate: Date;
  assignBy: ObjectId;
  status: boolean;
};

export type TSubscriptionModel = Model<TSubscription, Record<string, unknown>>;
