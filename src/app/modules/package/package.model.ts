import { Schema, model, Types } from "mongoose";
import type { TPackage, TPackageModel } from "./package.interface";
import { globalContent } from "../../global/globalSchema";

const componentsSchema = {
  type: String,
  content: globalContent,
  styles: Object,
  key: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
};

const packageSchema = new Schema<TPackage>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: { type: Number, required: true, default: 1 },
    totalUser: { type: Number, default: 0 },
    durationUnit: { type: String, enum: ["day", "month", "year"], default: "day" },
    features: [{ name: String, included: Boolean }],
  },
  { timestamps: true }
);

const PackageModel = model<TPackage, TPackageModel>("Package", packageSchema);

export default PackageModel;
