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
  // text: IComponentsSchema;
  // textGroup: IComponentsSchema;
  // button: IComponentsSchema;
  // image: IComponentsSchema;
  // designation: IComponentsSchema;
  // description: IComponentsSchema;
  _id: String;
  heading_secondary: IComponentsSchema;
  text_primary: IComponentsSchema;
  text_secondary: IComponentsSchema;
  image: IComponentsSchema;
  background_image: IComponentsSchema;
  description_primary: IComponentsSchema;
  description_secondary: IComponentsSchema;
  icon: IComponentsSchema;
  multiple_items: IComponentsSchema;
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

  header?: IGlobalTemplateSections;
  hero?: IGlobalTemplateSections;
  about?: IGlobalTemplateSections;
  contact?: IGlobalTemplateSections;
  services?: IGlobalTemplateSections;
  portfolio?: IGlobalTemplateSections;
  footer?: IGlobalTemplateSections;
  blog?: IGlobalTemplateSections;
};

export type TTemplateModel = Model<TTemplate, Record<string, unknown>>;
