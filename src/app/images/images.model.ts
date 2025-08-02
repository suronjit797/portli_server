import { Schema, model } from "mongoose";
import { ImageSchema } from "../../shared/constant";
import { ImageType } from "./images.interface";

const imagesSchema = new Schema<ImageType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: ImageSchema,
  },
  { timestamps: true },
);

const ImagesModel = model<ImageType>("Images", imagesSchema);

export default ImagesModel;
