import { IEnrollmentSubmission } from "@/interfaces/enrollmentSubmission";
import mongoose from "mongoose";

// enrollmentSubmissionSchema Model
const enrollmentSubmissionSchema = new mongoose.Schema(
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
    submittedContent: { type: String, required: false },
    score: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const EnrollmentSubmission =
  mongoose.models.EnrollmentSubmission ||
  mongoose.model<IEnrollmentSubmission & Document>(
    "EnrollmentSubmission",
    enrollmentSubmissionSchema
  );

export default EnrollmentSubmission;
