import { IEnrolment } from "@/interfaces/enrolment";
import { IUser } from "@/interfaces/user";
import mongoose, { Schema } from "mongoose";

export enum RoundStatusEnum {
  COMPLETED = "Completed",
  ONGOING = "Ongoing",
  UPCOMING = "Upcoming",
}

export enum RoundJudgementCriteriaEnum {
  PUBLIC = "Public",
  JUDGE = "Judge",
}

// IRound Interface
export interface IRound {
  id: string;
  roundNumber: number;
  startDate: Date; // Date as string (ISO 8601 format)
  endDate: Date; // Date as string (ISO 8601 format)
  judgementCriteria: RoundJudgementCriteriaEnum;
  maxScore: number;
  description: string;
  status: RoundStatusEnum;
  enrolments: IEnrolment[];
  judges: IUser[];
  competition: ICompetition;
  createdAt: string;
  updatedAt: string;
}

export enum CompetitionStatusEnum {
  DRAFT = "Draft",
  ACTIVE = "Active",
  FINISHED = "Finished",
}
export enum SubmissionTypeEnum {
  PHOTO = "Photo",
  VIDEO = "Video",
  AUDIO = "Audio",
  PDF = "Pdf",
  LINK = "Link",
}

export enum EnrolmentTypeEnum {
  PAID = "Paid",
  FREE = "Free",
}

// ICompetition Interface
export interface ICompetition {
  id: string;
  title: string;
  description: string;
  startDate: Date; // Date as string (ISO 8601 format)
  endDate: Date; // Date as string (ISO 8601 format)
  enrolmentDeadline: {
    startDate: Date; // Date as string (ISO 8601 format)
    endDate: Date; // Date as string (ISO 8601 format)
  };
  rounds: IRound[];
  enrolmentType: EnrolmentTypeEnum;
  price: number;
  mediaUrl?: string;
  submissionType: SubmissionTypeEnum;
  createdAt: string;
  updatedAt: string;
  status: CompetitionStatusEnum;
}
export interface ICompetitionDocument extends ICompetition, Document {}
// Competition Model
const competitionSchema = new Schema<ICompetitionDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    enrolmentDeadline: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    // rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Round" }],
    enrolmentType: {
      type: String,
      enum: Object.values(EnrolmentTypeEnum) as EnrolmentTypeEnum[], // Explicit cast
      default: EnrolmentTypeEnum.FREE,
    },
    price: { type: Number, required: true, default: 0 },
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
  },
  { timestamps: true }
);

export const Competition =
  mongoose.models.Competition ||
  mongoose.model<ICompetitionDocument>("Competition", competitionSchema);

export interface IRound {
  id: string;
  roundNumber: number;
  deadline: {
    startDate: Date;
    endDate: Date;
  };
  submissionDeadline?: {
    startDate: Date;
    endDate: Date;
  };
  judgingDeadline?: {
    startDate: Date;
    endDate: Date;
  };
  votingDeadline?: {
    startDate: Date;
    endDate: Date;
  };
  judgementCriteria: RoundJudgementCriteriaEnum;
  maxScore: number;
  description: string;
  status: RoundStatusEnum;
  enrolments: IEnrolment[];
  judges: IUser[];
  competition: ICompetition;
  createdAt: string;
  updatedAt: string;
}

export interface IRoundDocument extends IRound, Document {}

const dateRangeType = {
  startDate: Date,
  endDate: Date,
};

// Round Model
const roundSchema = new Schema<IRoundDocument>(
  {
    roundNumber: { type: Number, required: true },
    deadline: { type: dateRangeType, require: false },
    submissionDeadline: { type: dateRangeType, require: false },
    judgingDeadline: { type: dateRangeType, require: false },
    votingDeadline: { type: dateRangeType, require: false },
    judgementCriteria: {
      type: String,
      enum: Object.values(
        RoundJudgementCriteriaEnum
      ) as RoundJudgementCriteriaEnum[], // Explicit cast
      default: RoundJudgementCriteriaEnum.JUDGE,
    },
    maxScore: { type: Number, required: true },
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
  },
  { timestamps: true }
);

export const Round =
  mongoose.models.Round || mongoose.model<IRoundDocument>("Round", roundSchema);
