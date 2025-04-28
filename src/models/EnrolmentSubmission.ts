import { ISubmissionScore } from "@/interfaces/submissionscore";
import mongoose from "mongoose";

// SubmissionScore Model
const enrolmentSubmissionSchema = new mongoose.Schema(
  {
    enrolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrolment",
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
    submittedContnt: { type: String, required: false },

    score: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const SubmissionScore =
  mongoose.models.SubmissionScore ||
  mongoose.model<ISubmissionScore & Document>(
    "SubmissionScore",
    enrolmentSubmissionSchema
  );

export default SubmissionScore;
