import { IEnrolmentSubmission } from "@/interfaces/enrolmentSubmission";
import mongoose from "mongoose";

// enrolmentSubmissionSchema Model
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
    submittedContent: { type: String, required: false },
    score: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const EnrolmentSubmission =
  mongoose.models.EnrolmentSubmission ||
  mongoose.model<IEnrolmentSubmission & Document>(
    "EnrolmentSubmission",
    enrolmentSubmissionSchema
  );

export default EnrolmentSubmission;
