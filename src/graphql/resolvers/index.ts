import competitionResolver from "./competitionResolver";
import enrolmentResolver from "./enrolmentResolver";
import roundResolver from "./roundResolver";
import submissionScoreResolver from "./submissionScoreResolver";
import userResolver from "./userResolver";
import uploadResolver from "./uploadResolver";
import categoryResolver from "./categoryResolver";
import enrolmentSubmissionResolver from "./enrolmentSubmissionResolver";

export const resolvers = [
  competitionResolver,
  enrolmentResolver,
  roundResolver,
  enrolmentSubmissionResolver,
  submissionScoreResolver,
  userResolver,
  uploadResolver,
  categoryResolver,
];
