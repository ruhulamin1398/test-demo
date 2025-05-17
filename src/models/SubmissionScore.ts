import { ISubmissionScore } from "@/interfaces/submissionscore";
import mongoose from "mongoose";

// SubmissionScore Model
const submissionScoreSchema = new mongoose.Schema(
  {
    enrolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    roundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Round",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const SubmissionScore =
  mongoose.models.SubmissionScore ||
  mongoose.model<ISubmissionScore & Document>(
    "SubmissionScore",
    submissionScoreSchema
  );

export default SubmissionScore;
