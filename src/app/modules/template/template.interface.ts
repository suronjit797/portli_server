import { Model, ObjectId } from "mongoose";

export type TTemplate = {
  name: string;
  image: string;
  description: string;
  rating: number;
  themeUser?: number; //!have to change latter
  isAdminTemplate: boolean;
  user: ObjectId;

  hero?: ObjectId;
  // about?: ObjectId;
  // contact?: ObjectId;
  // service?: ObjectId;
  // work?: ObjectId;
  // experience?: ObjectId;
  // blog?: ObjectId;
};

export type TTemplateModel = Model<TTemplate, Record<string, unknown>>;
