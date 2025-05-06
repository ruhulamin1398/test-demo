import { SubmissionTypeEnum } from "@/interfaces";
import {
  IRoundDocument,
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
} from "@/interfaces/round";
import mongoose, { Schema } from "mongoose";

// Round Model
const roundSchema = new Schema<IRoundDocument>(
  {
    title: { type: String, required: true },
    roundNumber: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    judgementCriteria: {
      type: String,
      enum: Object.values(
        RoundJudgementCriteriaEnum
      ) as RoundJudgementCriteriaEnum[], // Explicit cast
      default: RoundJudgementCriteriaEnum.JUDGE,
    },
    maxScore: { type: Number, default: 0 },
    maxVote: { type: Number, default: 0 },
    maxWinners: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(RoundStatusEnum) as RoundStatusEnum[], // Explicit cast
      default: RoundStatusEnum.UPCOMING,
    },

    isActiveRound: { type: Boolean, required: false, default: false },
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrolment" }],
    judges: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true,
    },
    submissionType: {
      type: String,
      enum: Object.values(SubmissionTypeEnum) as SubmissionTypeEnum[], // Explicit cast
      default: SubmissionTypeEnum.PHOTO,
    },
    submissionStartDate: { type: Date, required: false },
    submissionEndDate: { type: Date, required: false },
  },
  { timestamps: true }
);

export const Round =
  mongoose.models.Round || mongoose.model<IRoundDocument>("Round", roundSchema);

export default Round;
