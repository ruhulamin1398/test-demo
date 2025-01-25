import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, RoleEnum } from "@/interfaces";

export interface IPhoneNumber {
  countryCode: string;
  number: string;
}

const phoneNumberSchema = new Schema<IPhoneNumber>({
  countryCode: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<IUser & Document>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  firstName: String,
  lastName: String,
  phoneNumber: phoneNumberSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: Object.values(RoleEnum) as RoleEnum[], // Explicit cast
    default: RoleEnum.USER,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

Object.assign(userSchema.statics, { RoleEnum });

export const User =
  mongoose.models.User || mongoose.model<IUser & Document>("User", userSchema);

export default User;
