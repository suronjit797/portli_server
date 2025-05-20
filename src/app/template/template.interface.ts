import { Model, ObjectId } from "mongoose";

export interface IVariants {
  name: string;
  value: string;
  colors: string[];
}

export interface IGlobalContent {
  text: string;
  url: string;
  elements: object[]; // This allows any kind of object inside the array
}

export interface IComponentsSchema {
  content: IGlobalContent;
  style: string[];
  _id: string;
}

export interface IGlobalTemplateSections {
  styles: Object;
  text: IComponentsSchema;
  textGroup: IComponentsSchema;
  button: IComponentsSchema;
  image: IComponentsSchema;
  designation: IComponentsSchema;
  description: IComponentsSchema;
  _id: String;
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

  hero?: IGlobalTemplateSections;
  about?: IGlobalTemplateSections;
  contact?: IGlobalTemplateSections;
  service?: IGlobalTemplateSections;
  work?: IGlobalTemplateSections;
  experience?: IGlobalTemplateSections;
  blog?: IGlobalTemplateSections;
};

export type TTemplateModel = Model<TTemplate, Record<string, unknown>>;
