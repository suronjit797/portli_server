import { Model, ObjectId } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user";
  password?: string;
  phoneNumber: string;
  activeTemplate?: string;
  paymentInfo?: ObjectId; //! in future
  // profilePicture?: object;

};

export type TUserModel = Model<TUser, Record<string, unknown>>;
