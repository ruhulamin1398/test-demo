import { IUser } from "@/interfaces/user";
import { ICompetition, SubmissionTypeEnum } from "@/interfaces/competition";
import { IEnrollment } from "./enrollment";

export enum RoundStatusEnum {
  COMPLETED = "Completed",
  ONGOING = "Ongoing",
  UPCOMING = "Upcoming",
}

export enum RoundJudgementCriteriaEnum {
  PUBLIC = "Public",
  JUDGE = "Judge",
  BOTH = "Both",
}

// IRound Interface
export interface IRound {
  id: string;
  title: string;
  roundNumber: number;
  deadline: {
    startDate: Date; // Date as string (ISO 8601 format)
    endDate: Date; // Date as string (ISO 8601 format)
  };
  submissionDeadline: {
    startDate: Date; // Date as string (ISO 8601 format)
    endDate: Date; // Date as string (ISO 8601 format)
  };
  votingDeadline: {
    startDate: Date; // Date as string (ISO 8601 format)
    endDate: Date; // Date as string (ISO 8601 format)
  };
  judgingDeadline: {
    startDate: Date; // Date as string (ISO 8601 format)
    endDate: Date; // Date as string (ISO 8601 format)
  };
  judgementCriteria: RoundJudgementCriteriaEnum;
  submissionType: SubmissionTypeEnum;
  maxScore: number;
  maxVote: number;
  maxWinners: number;
  description: string;
  status: RoundStatusEnum;
  enrollments: IEnrollment[];
  judges: IUser[];
  competition: ICompetition;
  createdAt: string;
  updatedAt: string;
}

export interface IRoundDocument extends IRound, Document {}
