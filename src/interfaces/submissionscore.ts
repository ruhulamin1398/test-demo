import { IEnrolment } from "@/interfaces/enrolment";
import { IRound } from "@/interfaces/round";
import { IUser } from "@/interfaces/user";

// ISubmissionScore Interface
export interface ISubmissionScore {
  id: string;
  enrolId: IEnrolment;
  roundId: IRound;
  userId: IUser;
  score: number;
  createdAt: string;
  updatedAt: string;
}
