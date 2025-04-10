import { Model, ObjectId } from "mongoose";

export type TTemplate = {
  name: string;
  hero?: ObjectId;
  about?: ObjectId;
  contact?: ObjectId;
  service?: ObjectId;
  work?: ObjectId;
  experience?: ObjectId;
  blog?: ObjectId;
  user: ObjectId;
  isAdminTemplate: boolean;
};

export type TTemplateModel = Model<TTemplate, Record<string, unknown>>;
