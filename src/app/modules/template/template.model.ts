import { Schema, model } from "mongoose";
import type { TTemplate, TTemplateModel } from "./template.interface";
import { globalContent } from "../../global/globalSchema";
import { Types } from "mongoose";

const heroComponentsSchema = new Schema(
  {
    content: globalContent,
    style: [{ type: String }],
    _id: { type: String, trim: true },
  },
  { _id: false }
);

const componentsSchema = {
  type: String,
  content: globalContent,
  styles: Object,
  key: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
};

const templateSchema = new Schema<TTemplate>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ratings: { type: Number, required: true, trim: true },
    themeUser: { type: Number },
    user: { type: Types.ObjectId, ref: "User", required: true },
    isAdminTemplate: { type: Boolean, default: false },
    variants: [
      {
        name: { type: String, trim: true },
        value: { type: String, trim: true },
        colors: [{ type: String, trim: true }],
      },
    ],

    // sections
    hero: {
      styles: Object,
      hero_text: heroComponentsSchema,
      hero_textGroup: heroComponentsSchema,
      hero_button: heroComponentsSchema,
      hero_image: heroComponentsSchema,
      hero_designation: heroComponentsSchema,
      hero_description: heroComponentsSchema,
      _id: String,
    },
    // about: { type: Types.ObjectId, ref: "About", required: false },
    // contact: { type: Types.ObjectId, ref: "Contact", required: false },
    // service: { type: Types.ObjectId, ref: "Service", required: false },
    // work: { type: Types.ObjectId, ref: "Work", required: false },
    // experience: { type: Types.ObjectId, ref: "Experience", required: false },
    // blog: { type: Types.ObjectId, ref: "Blog", required: false },
  },
  { timestamps: true }
);

const TemplateModel = model<TTemplate, TTemplateModel>("Template", templateSchema);

export default TemplateModel;
