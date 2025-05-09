import { Schema, model, Types } from "mongoose";
import type { TSubscription, TSubscriptionModel } from "./subscription.interface";
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

const subscriptionSchema = new Schema<TSubscription>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: { type: Number, required: true },
    durationUnit: { type: String, enum: ["day", "month", "year"], default: "day" },
    features: { type: Map, of: Schema.Types.Mixed, required: false },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

const SubscriptionModel = model<TSubscription, TSubscriptionModel>("Subscription", subscriptionSchema);

export default SubscriptionModel;
