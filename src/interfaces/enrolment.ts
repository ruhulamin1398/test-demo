import { ICompetition, SubmissionTypeEnum } from "@/interfaces/competition";
import { IUser } from "@/interfaces/user";

export enum EnrolmentStatusEnum {
  REJECTED = "Rejected",
  ACTIVE = "Active",
  PENDING = "Pending",
}

// IEnrolment Interface (Pivot between IUser and ICompetition)
export interface IEnrolment {
  id: string;
  competitionId: ICompetition;
  userId: IUser;
  enrolDate: Date; // ISO 8601 format date
  status: EnrolmentStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEnrolmentDocument extends IEnrolment, Document {}
