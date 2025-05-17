import { IEnrollment } from "@/interfaces/enrollment";
import { IRound } from "@/interfaces/round";
import { IUser } from "@/interfaces/user";

// ISubmissionScore Interface
export interface ISubmissionScore {
  id: string;
  enrolId: IEnrollment;
  roundId: IRound;
  userId: IUser;
  score: number;
  createdAt: string;
  updatedAt: string;
}
