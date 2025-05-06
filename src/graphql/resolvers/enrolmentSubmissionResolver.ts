import { IEnrolment, IUser } from "@/interfaces";
import { IEnrolmentSubmission } from "@/interfaces/enrolmentSubmission";
import { Enrolment, Round } from "@/models";
import EnrolmentSubmission from "@/models/EnrolmentSubmission";
import { GraphQLError } from "graphql";

const enrolmentSubmissionResolver = {
  Query: {
    GetActiveRoundSubmission: async (
      _: void,
      { competitionId }: { competitionId: string },
      { user }: { user: IUser | null }
    ): Promise<IEnrolmentSubmission | null> => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      // console.log("user in enrolment resolver ====== ", user);
      const enrolment = await Enrolment.findOne({
        competitionId,
        userId: user.id,
      });

      if (!enrolment) {
        throw new GraphQLError("User Doesn't Enrolled", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      const activeRound = await Round.findOne({
        competition: competitionId,
        isActiveRound: true,
      });
      const submission = await EnrolmentSubmission.findOne({
        roundId: activeRound.id,
        userId: user.id,
        enrolId: enrolment.id,
      }).populate("roundId");

      console.log(
        "submission from resolver____________________________",
        submission
      );
      return submission;
    },
  },
};

export default enrolmentSubmissionResolver;
