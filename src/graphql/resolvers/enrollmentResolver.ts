import { IEnrollment, IUser } from "@/interfaces";
import { Competition, Enrollment } from "@/models";
import { GraphQLError } from "graphql";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
const enrollmentResolver = {
  Query: {
    getEnrollments: async (): Promise<IEnrollment[]> => {
      return Enrollment.find().populate("competitionId").populate("userId");
    },
    getEnrollment: async (
      _: void,
      { id }: { id: string }
    ): Promise<IEnrollment | null> => {
      return Enrollment.findById(id)
        .populate("competitionId")
        .populate("userId");
    },
  },
  Mutation: {
    createEnrollment: async (
      _: void,
      {
        competitionId,
      }: {
        competitionId: string;
      },
      { user }: { user: IUser | null }
    ): Promise<IEnrollment> => {
      if (!user) {
        // user fetch error
        throw new Error("Not authenticated");
      }
      // Check if the email already exists
      const alreadyEnrolled = await Enrollment.findOne({
        competitionId,
        userId: user.id,
      });
      if (alreadyEnrolled) {
        throw new GraphQLError("You have already enrolled to this competition");
      }
      const competition = await Competition.findById(competitionId);
      if (!competition) {
        throw new Error("The specified competition does not exist.");
      }

      dayjs.extend(isBetween);
      const isDeadlineExist = dayjs().isBetween(
        competition.enrollmentDeadline?.startDate,
        competition.enrollmentDeadline?.endDate,
        "day",
        "[]"
      ); // '[]' means inclusive
      if (!isDeadlineExist) {
        throw new Error(
          "Submissions are only allowed during the submission period."
        );
      }

      try {
        const enrollment = new Enrollment({
          competitionId,
          userId: user.id,
        });
        return enrollment.save();
      } catch (_error: unknown) {
        throw new GraphQLError("Something went wrong, we are looking into it.");
      }
    },
    updateEnrollment: async (
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
    ): Promise<IEnrollment | null> => {
      return Enrollment.findByIdAndUpdate(
        id,
        { mediaUrl, submissionType, status },
        { new: true }
      );
    },
    deleteEnrollment: async (
      _: void,
      { id }: { id: string }
    ): Promise<IEnrollment | null> => {
      return Enrollment.findByIdAndDelete(id);
    },
  },
};

export default enrollmentResolver;
