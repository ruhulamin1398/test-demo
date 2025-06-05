import {
  EnrollmentStatusEnum,
  IEnrollmentDocument,
} from "@/interfaces/enrollment";
import mongoose, { Schema } from "mongoose";

// Enrollment Model (Pivot)
const enrollmentSchema = new Schema<IEnrollmentDocument>(
  {
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrolDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(EnrollmentStatusEnum) as EnrollmentStatusEnum[], // Explicit cast
      default: EnrollmentStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const Enrollment =
  mongoose.models.Enrollment ||
  mongoose.model<IEnrollmentDocument>("Enrollment", enrollmentSchema);

export default Enrollment;
