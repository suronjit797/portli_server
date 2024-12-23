import { Schema, model } from "mongoose";
import { TTransactions, TTransactionsModel } from "./transactions.interface";

const transactionSchema = new Schema<TTransactions>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enums: ["income", "expense", "give", "take", "save", "withdraw"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isPending: {
      type: Boolean,
      default: true,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const TransactionsModel = model<TTransactions, TTransactionsModel>("Transactions", transactionSchema);

export default TransactionsModel;
