import { getResolverErrorMessage } from "@/app/lib/utils";
import {
  IRound,
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
} from "@/interfaces";
import { Enrolment, Round, User } from "@/models";
import { GraphQLError } from "graphql";

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
          startDate: string;
          endDate: string;
          submissionStartDate: string;
          submissionEndDate: string;
          maxScore: number;
          status: RoundStatusEnum;
          isActiveRound: boolean;
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
          startDate,
          endDate,
          submissionStartDate,
          submissionEndDate,
          maxScore,
          status,
          isActiveRound,
          maxWinners,
          judges = [],
        } = input;
        const round = new Round({
          competition,
          title,
          description,
          roundNumber,
          judgementCriteria,
          startDate,
          endDate,
          submissionStartDate,
          submissionEndDate,
          maxScore: Number(maxScore),
          isActiveRound,
          status,
          maxWinners: Number(maxWinners),
          judges,
        });
        console.log(" new round ______++___", round);
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
          startDate: string;
          endDate: string;
          submissionStartDate: string;
          submissionEndDate: string;
          maxScore: number;
          status: RoundStatusEnum;
          isActiveRound: boolean;
          judges: [];
          maxWinners: number;
        };
      }
    ): Promise<IRound | null> => {
      const {
        competition,
        title,
        description,
        roundNumber,
        judgementCriteria,
        startDate,
        endDate,
        submissionStartDate,
        submissionEndDate,
        maxScore,
        status,
        isActiveRound,
        maxWinners,
        judges = [],
      } = input;
      return Round.findByIdAndUpdate(
        id,
        {
          competition,
          title,
          description,
          roundNumber,
          judgementCriteria,
          startDate,
          endDate,
          submissionStartDate,
          submissionEndDate,
          maxScore,
          status,
          isActiveRound,
          maxWinners,
          judges,
        },
        { new: true }
      );
    },
    deleteRound: async (
      _: void,
      { id }: { id: string }
    ): Promise<IRound | null> => {
      return Round.findByIdAndDelete(id);
    },
  },
  Round: {
    enrolledIds: async (round: IRound) => {
      return Enrolment.find({ _id: { $in: round.enrollments } });
    },
    judges: async (round: IRound) => {
      return User.find({ _id: { $in: round.judges } });
    },
  },
};

export default roundResolver;
