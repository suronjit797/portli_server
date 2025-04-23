import mongoose, { Schema } from "mongoose";

export const globalContent = new mongoose.Schema({
  text: String,
  url: String,
  elements: [{}], // This allows any kind of object inside the array
},{ _id: false });