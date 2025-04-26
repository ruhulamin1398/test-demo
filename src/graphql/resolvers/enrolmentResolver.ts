import { IEnrolment, IUser } from "@/interfaces";
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
      }: {
        competitionId: string;
      },
      { user }: { user: IUser | null }
    ): Promise<IEnrolment> => {
      if (!user) {
        // user fetch error
        throw new Error("Not authenticated");
      }
      try {
        const enrolment = new Enrolment({
          competitionId,
          userId: user.id,
        });
        return enrolment.save();
      } catch (_error: unknown) {
        throw new Error("Something went wrong, we are looking into it.");
      }
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
