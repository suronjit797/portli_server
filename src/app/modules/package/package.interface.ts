import { Model } from "mongoose";

export type TPackage = {
  name: string;
  duration: number;
  amount: number;
  description: string;
  features: object
};

export type TPackageModel = Model<TPackage, Record<string, unknown>>;
