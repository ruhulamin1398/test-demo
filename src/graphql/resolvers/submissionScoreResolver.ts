import { ISubmissionScore } from "@/interfaces";
import { SubmissionScore } from "@/models";

const submissionScoreResolver = {
  Query: {
    getSubmissionScores: async (): Promise<ISubmissionScore[]> => {
      return SubmissionScore.find()
        .populate("enrolId")
        .populate("roundId")
        .populate("userId");
    },
    getSubmissionScore: async (
      _: void,
      { id }: { id: string }
    ): Promise<ISubmissionScore | null> => {
      return SubmissionScore.findById(id)
        .populate("enrolId")
        .populate("roundId")
        .populate("userId");
    },
  },
  Mutation: {
    createSubmissionScore: async (
      _: void,
      {
        enrolId,
        roundId,
        userId,
        score,
      }: { enrolId: string; roundId: string; userId: string; score: number }
    ): Promise<ISubmissionScore> => {
      const submissionScore = new SubmissionScore({
        enrolId,
        roundId,
        userId,
        score,
      });
      return submissionScore.save();
    },
    updateSubmissionScore: async (
      _: void,
      { id, score }: { id: string; score: number }
    ): Promise<ISubmissionScore | null> => {
      return SubmissionScore.findByIdAndUpdate(id, { score }, { new: true });
    },
    deleteSubmissionScore: async (
      _: void,
      { id }: { id: string }
    ): Promise<ISubmissionScore | null> => {
      return SubmissionScore.findByIdAndDelete(id);
    },
  },
};

export default submissionScoreResolver;
