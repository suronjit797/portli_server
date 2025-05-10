import mongoose, { Schema } from "mongoose";

export const globalContent = new mongoose.Schema(
  {
    text: String,
    url: String,
    elements: [{}], // This allows any kind of object inside the array
  },
  { _id: false }
);

export const componentsSchema = new Schema(
  {
    content: globalContent,
    style: [{ type: String }],
    _id: { type: String, trim: true },
  },
  { _id: false }
);

export const globalTemplateSections = {
  styles: Object,
  text: componentsSchema,
  textGroup: componentsSchema,
  button: componentsSchema,
  image: componentsSchema,
  designation: componentsSchema,
  description: componentsSchema,
  _id: String,
};
