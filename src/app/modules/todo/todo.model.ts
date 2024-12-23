import { Schema, model } from "mongoose";
import { TTodo, TTodoModel } from "./todo.interface";

const todoSchema = new Schema<TTodo>(
  {
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
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

const TodoModel = model<TTodo, TTodoModel>("Todo", todoSchema);

export default TodoModel;
