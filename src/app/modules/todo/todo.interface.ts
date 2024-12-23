import { Model, ObjectId } from "mongoose";

export type TTodo = {
  title: string;
  isDone: boolean;
  isImportant: boolean;
  user: ObjectId;
};

export type TTodoModel = Model<TTodo, Record<string, unknown>>;
