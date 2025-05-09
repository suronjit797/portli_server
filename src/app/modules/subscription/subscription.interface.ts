import { Model, ObjectId } from "mongoose";

export type TSubscription = {
  name: string;
  duration: number;
  durationUnit: string;
  amount: number;
  description: string;
  features: object;
  user: ObjectId
};

export type TSubscriptionModel = Model<TSubscription, Record<string, unknown>>;
