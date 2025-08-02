import { Document, ObjectId } from "mongoose";
import { ImageInterface } from "../../global/globalInterfaces";

export interface ImageType extends Document {
  user: ObjectId;
  image: ImageInterface;
}
