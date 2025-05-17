import { ICompetition, SubmissionTypeEnum } from "@/interfaces/competition";
import { IUser } from "@/interfaces/user";

export enum EnrollmentStatusEnum {
  REJECTED = "Rejected",
  ACTIVE = "Active",
  PENDING = "Pending",
}

// IEnrollment Interface (Pivot between IUser and ICompetition)
export interface IEnrollment {
  id: string;
  competitionId: ICompetition;
  userId: IUser;
  enrolDate: Date; // ISO 8601 format date
  status: EnrollmentStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEnrollmentDocument extends IEnrollment, Document {}
