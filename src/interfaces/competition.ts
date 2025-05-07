import { IRound } from "@/interfaces/round";

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

export interface IPrizesAndRewards {
  id: string;
  title: string;
  position: number;
  totalAwardws: number;
  rewards: string;
}

// ICompetition Interface
export interface ICompetition {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  startDate: Date;
  endDate: Date;
  enrolmentDeadline: {
    startDate: Date;
    endDate: Date;
  };
  prizes: IPrizesAndRewards[];
  rounds: IRound[];
  enrolmentType: EnrolmentTypeEnum;
  price: number;
  mediaUrl?: string;
  submissionType: SubmissionTypeEnum;
  createdAt: string;
  updatedAt: string;
  status: CompetitionStatusEnum;
  haveRoundWiseSubmission: boolean;
  slug?: string;
  activeRound?: IRound;
  enroledUserCount?: number;
}

export interface PaginationInput {
  page: number;
  limit: number;
}

export interface CompetitionFilterInput {
  isActive?: boolean;
  title?: string;
}

export interface CompetitionResponse {
  competitions: ICompetition[];
  totalCount: number;
}

export interface ICompetitionDocument extends ICompetition, Document {}

export interface RoundDetails {
  id: number;
  title: string;
  description: string;
  status: string;
  message: string;
}
