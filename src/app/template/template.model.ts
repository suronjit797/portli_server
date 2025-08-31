import { Schema, Types, model } from "mongoose";

import type { TTemplate, TTemplateModel } from "./template.interface";
import { globalTemplateSections } from "../../global/globalSchema";

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
    header: globalTemplateSections,
    hero: globalTemplateSections,
    about: globalTemplateSections,
    contact: globalTemplateSections,
    services: globalTemplateSections,
    portfolio: globalTemplateSections,
    footer: globalTemplateSections,
    blog: globalTemplateSections,
  },
  { timestamps: true },
);

const TemplateModel = model<TTemplate, TTemplateModel>("Template", templateSchema);

export default TemplateModel;
