import { getResolverErrorMessage } from "@/app/lib/utils";
import {
  IRound,
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
  SubmissionTypeEnum,
} from "@/interfaces";
import { Enrollment, Round, User } from "@/models";
import { GraphQLError } from "graphql";
interface DeleteRoundArgs {
  id: string;
}

interface DeleteResponse {
  success: boolean;
  message?: string;
}
const roundResolver = {
  Query: {
    getRounds: async (): Promise<IRound[]> => {
      return Round.find().populate("enrolledIds").populate("judges");
    },
    getRound: async (
      _: void,
      { id }: { id: string }
    ): Promise<IRound | null> => {
      return Round.findById(id).populate("enrolledIds").populate("judges");
    },
  },
  Mutation: {
    createRound: async (
      _: void,
      {
        input,
      }: {
        input: {
          competition: string;
          title: string;
          description: string;
          roundNumber: number;
          judgementCriteria: RoundJudgementCriteriaEnum;
          deadline: { startDate: string; endDate: string };
          submissionDeadline: { startDate: string; endDate: string };
          votingDeadline: { startDate: string; endDate: string };
          judgingDeadline: { startDate: string; endDate: string };
          submissionType: SubmissionTypeEnum;
          maxScore: number;
          maxVote: number;
          status: RoundStatusEnum;
          judges: [];
          maxWinners: number;
        };
      }
    ): Promise<IRound> => {
      try {
        console.log("The input is", input);
        const {
          competition,
          title,
          description,
          roundNumber,
          judgementCriteria,
          deadline,
          submissionDeadline,
          votingDeadline,
          judgingDeadline,
          submissionType,
          maxScore,
          maxVote,
          status,
          maxWinners,
          judges = [],
        } = input;
        const round = new Round({
          competition,
          title,
          description,
          roundNumber,
          judgementCriteria,
          ...(deadline
            ? {
                deadline: {
                  startDate: new Date(deadline.startDate as string),
                  endDate: new Date(deadline.endDate as string),
                },
              }
            : {}),
          ...(submissionDeadline
            ? {
                submissionDeadline: {
                  startDate: new Date(submissionDeadline.startDate as string),
                  endDate: new Date(submissionDeadline.endDate as string),
                },
              }
            : {}),
          ...(votingDeadline
            ? {
                votingDeadline: {
                  startDate: new Date(votingDeadline.startDate as string),
                  endDate: new Date(votingDeadline.endDate as string),
                },
              }
            : {}),
          ...(judgingDeadline
            ? {
                judgingDeadline: {
                  startDate: new Date(judgingDeadline.startDate as string),
                  endDate: new Date(judgingDeadline.endDate as string),
                },
              }
            : {}),
          submissionType,
          maxScore: Number(maxScore),
          maxVote: Number(maxVote),
          status,
          maxWinners: Number(maxWinners),
          judges,
        });
        console.log(" new round ______++___", round, {
          deadline,
          submissionDeadline,
          votingDeadline,
          judgingDeadline,
        });
        return await round.save();
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
    updateRound: async (
      _: void,
      {
        id,
        input,
      }: {
        id: string;
        input: {
          competition: string;
          title: string;
          description: string;
          roundNumber: number;
          judgementCriteria: RoundJudgementCriteriaEnum;
          submissionType: SubmissionTypeEnum;
          maxScore: number;
          maxVote: number;
          status: RoundStatusEnum;
          judges: [];
          maxWinners: number;
          deadline: { startDate: string; endDate: string };
          submissionDeadline: { startDate: string; endDate: string };
          votingDeadline: { startDate: string; endDate: string };
          judgingDeadline: { startDate: string; endDate: string };
        };
      }
    ): Promise<IRound | null> => {
      const {
        competition,
        title,
        description,
        roundNumber,
        judgementCriteria,
        submissionType,
        maxVote,
        status,
        maxWinners,
        judges = [],
        deadline,
        submissionDeadline,
        votingDeadline,
        judgingDeadline,
      } = input;
      return await Round.findByIdAndUpdate(
        id,
        {
          competition,
          title,
          description,
          roundNumber,
          judgementCriteria,
          submissionType,
          maxVote,
          status,
          maxWinners,
          judges,
          ...(deadline
            ? {
                deadline: {
                  startDate: new Date(deadline.startDate as string),
                  endDate: new Date(deadline.endDate as string),
                },
              }
            : {}),
          ...(submissionDeadline
            ? {
                submissionDeadline: {
                  startDate: new Date(submissionDeadline.startDate as string),
                  endDate: new Date(submissionDeadline.endDate as string),
                },
              }
            : {}),
          ...(votingDeadline
            ? {
                votingDeadline: {
                  startDate: new Date(votingDeadline.startDate as string),
                  endDate: new Date(votingDeadline.endDate as string),
                },
              }
            : {}),
          ...(judgingDeadline
            ? {
                judgingDeadline: {
                  startDate: new Date(judgingDeadline.startDate as string),
                  endDate: new Date(judgingDeadline.endDate as string),
                },
              }
            : {}),
        },
        { new: true }
      );
    },
    deleteRound: async (
      _: unknown,
      { id }: DeleteRoundArgs
    ): Promise<DeleteResponse> => {
      try {
        const round = await Round.findById(id);
        if (!round) {
          throw new GraphQLError("Invalid round.", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        await Round.findByIdAndDelete(id);
        return {
          success: true,
          message: "Round deleted successfully.",
        };
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
  },
  Round: {
    enrolledIds: async (round: IRound) => {
      return Enrollment.find({ _id: { $in: round.enrollments } });
    },
    judges: async (round: IRound) => {
      return User.find({ _id: { $in: round.judges } });
    },
  },
};

export default roundResolver;
