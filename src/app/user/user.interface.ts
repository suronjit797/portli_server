import { Model, ObjectId } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user";
  password?: string;
  phoneNumber: string;
  selectedTheme?: ObjectId;
  selectedVariant: string;
  subscribedPackage: ObjectId;
  uniqueSubDomain: string;
};

export type TUserModel = Model<TUser, Record<string, unknown>>;
