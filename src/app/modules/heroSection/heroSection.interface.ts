import mongoose, { Model, ObjectId } from "mongoose";
import { TGlobalContent } from "../../global/globalInterfaces";

interface THeroComponents {
  type: string;
  content: TGlobalContent;
  styles: Object;
  key: ObjectId;
}

export type THeroSection = {
  styles: Record<string, any>;
  hero_text: THeroComponents;
  hero_TextGroup: THeroComponents;
  hero_button: THeroComponents;
  hero_image: THeroComponents;
  hero_designation: THeroComponents;
  hero_description: THeroComponents;
  user: {
    type: mongoose.Types.ObjectId;
    ref: "User";
  };
};

export type THeroSectionModel = Model<THeroSection, Record<string, unknown>>;
