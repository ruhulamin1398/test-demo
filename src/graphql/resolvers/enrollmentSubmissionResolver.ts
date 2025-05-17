import { IUser } from "@/interfaces";
import { IEnrollmentSubmission } from "@/interfaces/enrollmentSubmission";
import { Round } from "@/models";
import Enrollment from "@/models/Enrollment";
import EnrollmentSubmission from "@/models/EnrollmentSubmission";
import { GraphQLError } from "graphql";

const enrollmentSubmissionResolver = {
  Query: {
    GetActiveRoundSubmission: async (
      _: void,
      { competitionId }: { competitionId: string },
      { user }: { user: IUser | null }
    ): Promise<IEnrollmentSubmission | null> => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      // console.log("user in enrollment resolver ====== ", user);
      const enrollment = await Enrollment.findOne({
        competitionId,
        userId: user.id,
      });

      if (!enrollment) {
        throw new GraphQLError("User Doesn't Enrolled", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      const activeRound = await Round.findOne({
        competition: competitionId,
      });
      const submission = await EnrollmentSubmission.findOne({
        roundId: activeRound.id,
        userId: user.id,
        enrolId: enrollment.id,
      }).populate("roundId");

      console.log(
        "submission from resolver____________________________",
        submission
      );
      return submission;
    },
  },
};

export default enrollmentSubmissionResolver;
