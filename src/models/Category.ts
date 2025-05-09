// models/Category.ts

import { ICategoryDocument } from "@/interfaces/category";
import { Schema, model, models } from "mongoose";
const categorySchema: Schema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: false,
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

export const Category =
  models.Category || model<ICategoryDocument>("Category", categorySchema);

export default Category;
