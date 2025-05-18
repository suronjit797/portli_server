import { Model } from "mongoose";

export type TPackage = {
  name: string;
  duration: number;
  durationUnit: string;
  amount: number;
  totalUser: number;
  activeUser: number;
  description: string;
  features: object;
};

export type TPackageModel = Model<TPackage, Record<string, unknown>>;
