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
    hero: { type: Types.ObjectId, ref: "Hero", required: false },
    about: { type: Types.ObjectId, ref: "About", required: false },
    contact: { type: Types.ObjectId, ref: "Contact", required: false },
    service: { type: Types.ObjectId, ref: "Service", required: false },
    work: { type: Types.ObjectId, ref: "Work", required: false },
    experience: { type: Types.ObjectId, ref: "Experience", required: false },
    blog: { type: Types.ObjectId, ref: "Blog", required: false },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const TemplateModel = model<TTemplate, TTemplateModel>("Template", templateSchema);

export default TemplateModel;
