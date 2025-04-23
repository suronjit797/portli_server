import { Schema, model } from "mongoose";
import type { THeroSection, THeroSectionModel } from "./heroSection.interface";
import { globalContent } from "../../global/globalSchema";
import { Types } from "mongoose";

const componentsSchema = new Schema({
  content: globalContent,
  styles: Object,
  key: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
},{ _id: false });

const heroSectionSchema = new Schema<THeroSection>(
  {
    styles: Object,
    hero_text: componentsSchema,
    hero_textGroup: componentsSchema,
    hero_button: componentsSchema,
    hero_image: componentsSchema,
    hero_designation: componentsSchema,
    hero_description: componentsSchema,
  },
  { timestamps: true }
);

const HeroSectionModel = model<THeroSection, THeroSectionModel>("Hero", heroSectionSchema);

export default HeroSectionModel;
