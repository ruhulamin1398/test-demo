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
  submittedContent: string;
  createdAt: string;
  updatedAt: string;
}
