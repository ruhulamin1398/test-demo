import competitionResolver from "./competitionResolver";
import enrollmentResolver from "./enrollmentResolver";
import roundResolver from "./roundResolver";
import submissionScoreResolver from "./submissionScoreResolver";
import userResolver from "./userResolver";
import uploadResolver from "./uploadResolver";
import categoryResolver from "./categoryResolver";
import enrollmentSubmissionResolver from "./enrollmentSubmissionResolver";

export const resolvers = [
  competitionResolver,
  enrollmentResolver,
  roundResolver,
  enrollmentSubmissionResolver,
  submissionScoreResolver,
  userResolver,
  uploadResolver,
  categoryResolver,
];
