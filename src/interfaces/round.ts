import { IEnrolment } from "@/interfaces/enrolment";
import { IUser } from "@/interfaces/user";
import { ICompetition, SubmissionTypeEnum } from "@/interfaces/competition";

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
  startDate: Date; // Date as string (ISO 8601 format)
  endDate: Date; // Date as string (ISO 8601 format)
  submissionStartDate: Date; // Date as string (ISO 8601 format)
  submissionEndDate: Date; // Date as string (ISO 8601 format)
  judgementCriteria: RoundJudgementCriteriaEnum;

  submissionType: SubmissionTypeEnum;
  maxScore: number;
  maxWinners: number;
  description: string;
  status: RoundStatusEnum;
  isActiveRound: Boolean;
  enrollments: IEnrolment[];
  judges: IUser[];
  competition: ICompetition;
  createdAt: string;
  updatedAt: string;
}

export interface IRoundDocument extends IRound, Document {}
