import {
  EnrolmentStatusEnum,
  IEnrolmentDocument,
} from "@/interfaces/enrolment";
import mongoose, { Schema } from "mongoose";

// Enrolment Model (Pivot)
const enrolmentSchema = new Schema<IEnrolmentDocument>(
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
    mediaUrl: { type: String, required: true },
    submissionType: { type: String, enum: ["photo", "video"], required: true },
    status: {
      type: String,
      enum: Object.values(EnrolmentStatusEnum) as EnrolmentStatusEnum[], // Explicit cast
      default: EnrolmentStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const Enrolment =
  mongoose.models.Enrolment ||
  mongoose.model<IEnrolmentDocument>("Enrolment", enrolmentSchema);

export default Enrolment;
