import {
  CompetitionStatusEnum,
  EnrolmentTypeEnum,
  ICompetitionDocument,
  SubmissionTypeEnum,
  IPrizesAndRewards,
} from "@/interfaces/competition";
import mongoose, { Schema } from "mongoose";
import { boolean } from "zod";

const PrizesAndRewardsSchema = new Schema<IPrizesAndRewards>({
  title: { type: String, required: true },
  position: { type: Number, required: true },
  totalAwardws: { type: Number, required: true },
  rewards: { type: String, required: true },
});
// Competition Model
const competitionSchema = new Schema<ICompetitionDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eligibility: { type: String, required: true, default: "Open for everyone" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    enrolmentDeadline: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    prizes: {
      type: [PrizesAndRewardsSchema], // Array of prizes
    },
    enrolmentType: {
      type: String,
      enum: Object.values(EnrolmentTypeEnum) as EnrolmentTypeEnum[], // Explicit cast
      default: EnrolmentTypeEnum.FREE,
    },
    price: { type: Number, required: true, default: 0 },
    haveRoundWiseSubmission: { type: Boolean, required: false, default: false },
    mediaUrl: { type: String },
    submissionType: {
      type: String,
      enum: Object.values(SubmissionTypeEnum) as SubmissionTypeEnum[], // Explicit cast
      default: SubmissionTypeEnum.PHOTO,
    },
    status: {
      type: String,
      enum: Object.values(CompetitionStatusEnum) as CompetitionStatusEnum[], // Explicit cast
      default: CompetitionStatusEnum.DRAFT,
    },
    slug: { type: String, required: false },
    activeRound: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Round",
      required: false,
    },
  },
  { timestamps: true }
);

export const Competition =
  mongoose.models.Competition ||
  mongoose.model<ICompetitionDocument>("Competition", competitionSchema);

export default Competition;
