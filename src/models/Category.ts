// models/Category.ts

import { ICategoryDocument } from "@/interfaces/category";
import { Schema, model } from "mongoose";

const CategorySchema: Schema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Category = model<ICategoryDocument>("Category", CategorySchema);

export default Category;
