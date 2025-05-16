import { SubmissionTypeEnum } from "@/interfaces";
import {
  IRoundDocument,
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
} from "@/interfaces/round";
import mongoose, { Schema } from "mongoose";

const dateRangeSchema = new Schema(
  {
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
  },
  { _id: false }
);

// Round Model
const roundSchema = new Schema<IRoundDocument>(
  {
    title: { type: String, required: true },
    roundNumber: { type: Number, required: true },
    deadline: { type: dateRangeSchema, require: false },
    submissionDeadline: { type: dateRangeSchema, require: false },
    judgingDeadline: { type: dateRangeSchema, require: false },
    votingDeadline: { type: dateRangeSchema, require: false },
    judgementCriteria: {
      type: String,
      enum: Object.values(
        RoundJudgementCriteriaEnum
      ) as RoundJudgementCriteriaEnum[], // Explicit cast
      default: RoundJudgementCriteriaEnum.JUDGE,
    },
    maxScore: { type: Number, required: true, default: 0 },
    maxVote: { type: Number, required: true, default: 0 },
    maxWinners: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(RoundStatusEnum) as RoundStatusEnum[], // Explicit cast
      default: RoundStatusEnum.UPCOMING,
    },
    enrolments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrolment" }],
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
  },
  { timestamps: true }
);
export const Round =
  mongoose.models.Round || mongoose.model<IRoundDocument>("Round", roundSchema);

export default Round;
