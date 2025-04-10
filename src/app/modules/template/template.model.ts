import { Schema, model } from "mongoose";
import type { TTemplate, TTemplateModel } from "./template.interface";
import { globalContent } from "../../global/globalSchema";
import { Types } from "mongoose";

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
    name: { type: String, required: true, unique: true, trim: true },
    hero: { type: Types.ObjectId, ref: "Hero", required: false },
    about: { type: Types.ObjectId, ref: "About", required: false },
    contact: { type: Types.ObjectId, ref: "Contact", required: false },
    service: { type: Types.ObjectId, ref: "Service", required: false },
    work: { type: Types.ObjectId, ref: "Work", required: false },
    experience: { type: Types.ObjectId, ref: "Experience", required: false },
    blog: { type: Types.ObjectId, ref: "Blog", required: false },
    user: { type: Types.ObjectId, ref: "User", required: true },
    isAdminTemplate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TemplateModel = model<TTemplate, TTemplateModel>("Template", templateSchema);

export default TemplateModel;
