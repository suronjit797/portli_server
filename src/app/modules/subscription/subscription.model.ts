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
    user: { type: Schema.Types.ObjectId, ref: "User" },
    package: { type: Schema.Types.ObjectId, ref: "Package" },
    expireDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const SubscriptionModel = model<TSubscription, TSubscriptionModel>("Subscription", subscriptionSchema);

export default SubscriptionModel;
