import { Model, ObjectId } from "mongoose";

export type TTemplate = {
  hero?: ObjectId;
  about?: ObjectId;
  contact?: ObjectId;
  service?: ObjectId;
  work?: ObjectId;
  experience?: ObjectId;
  blog?: ObjectId;
  user: ObjectId;
};

export type TTemplateModel = Model<TTemplate, Record<string, unknown>>;
