import { IEnrolment } from "@/interfaces";
import { Enrolment } from "@/models";

const enrolmentResolver = {
  Query: {
    getEnrolments: async (): Promise<IEnrolment[]> => {
      return Enrolment.find().populate("competitionId").populate("userId");
    },
    getEnrolment: async (
      _: void,
      { id }: { id: string }
    ): Promise<IEnrolment | null> => {
      return Enrolment.findById(id)
        .populate("competitionId")
        .populate("userId");
    },
  },
  Mutation: {
    createEnrolment: async (
      _: void,
      {
        competitionId,
        userId,
        mediaUrl,
        submissionType,
      }: {
        competitionId: string;
        userId: string;
        mediaUrl: string;
        submissionType: string;
      }
    ): Promise<IEnrolment> => {
      const enrolment = new Enrolment({
        competitionId,
        userId,
        mediaUrl,
        submissionType,
      });
      return enrolment.save();
    },
    updateEnrolment: async (
      _: void,
      {
        id,
        mediaUrl,
        submissionType,
        status,
      }: {
        id: string;
        mediaUrl?: string;
        submissionType?: string;
        status?: string;
      }
    ): Promise<IEnrolment | null> => {
      return Enrolment.findByIdAndUpdate(
        id,
        { mediaUrl, submissionType, status },
        { new: true }
      );
    },
    deleteEnrolment: async (
      _: void,
      { id }: { id: string }
    ): Promise<IEnrolment | null> => {
      return Enrolment.findByIdAndDelete(id);
    },
  },
};

export default enrolmentResolver;
