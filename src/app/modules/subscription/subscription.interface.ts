import { Model, ObjectId } from "mongoose";

export type TSubscription = {
  package: ObjectId;
  user: ObjectId;
  expireDate: Date;
};

export type TSubscriptionModel = Model<TSubscription, Record<string, unknown>>;
