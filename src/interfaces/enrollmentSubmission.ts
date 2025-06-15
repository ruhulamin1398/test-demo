import { IEnrollment } from "@/interfaces/enrollment";
import { IRound } from "@/interfaces/round";
import { IUser } from "@/interfaces/user";

// ISubmissionScore Interface
export interface IEnrollmentSubmission {
  id: string;
  enrolId: IEnrollment;
  roundId: IRound;
  userId: IUser;
  score: number;
  title: string;
  description: string;
  submittedContent: string;
  createdAt: string;
  updatedAt: string;
}
export interface IEnrollmentSubmissionInput {
  title: string;
  description: string;
}
