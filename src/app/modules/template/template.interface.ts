import { Model, ObjectId } from "mongoose";

export interface IVariants {
  name: string;
  value: string;
  colors: string[];
}

export type TTemplate = {
  name: string;
  image: string;
  description: string;
  variants: IVariants[];
  ratings: number;
  themeUser?: number; //!have to change latter
  isAdminTemplate: boolean;
  user: ObjectId;

  hero?: object;
  // about?: ObjectId;
  // contact?: ObjectId;
  // service?: ObjectId;
  // work?: ObjectId;
  // experience?: ObjectId;
  // blog?: ObjectId;
};

export type TTemplateModel = Model<TTemplate, Record<string, unknown>>;
