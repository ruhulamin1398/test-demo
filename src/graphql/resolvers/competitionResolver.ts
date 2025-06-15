import { getResolverErrorMessage } from "@/app/lib/utils";
import {
  CompetitionFilterInput,
  CompetitionResponse,
  CompetitionStatusEnum,
  ICompetition,
  IPrizesAndRewards,
  IUser,
  PaginationInput,
  SubmissionTypeEnum,
} from "@/interfaces";
import { Competition, Round } from "@/models";
import Enrollment from "@/models/Enrollment";
import EnrollmentSubmission from "@/models/EnrollmentSubmission";
import { GraphQLError } from "graphql";

const competitionResolver = {
  Query: {
    getCompetition: async (
      _: void,
      { id }: { id: string },
      { user }: { user: IUser | null }
    ): Promise<ICompetition | null> => {
      const competition = await Competition.findById(id);
      console.log(competition);

      return competition;
    },
    getCompetitions: async (
      _parent: unknown, // Parent object (could be null or previous result)
      {
        page,
        filter,
      }: { page: PaginationInput; filter?: CompetitionFilterInput }, // Args with pagination and optional filter
      { user }: { user: IUser | null },
      _context: unknown, // Context (e.g., for authentication)
      _info: unknown // Info about the query (e.g., field name, schema)
    ): Promise<CompetitionResponse> => {
      try {
        type FilterPropsType = {
          title?: { $regex: string; $options: string };
          isActive?: boolean;
        };
        const { limit, page: currentPage } = page;

        // Calculate the skip value for pagination
        const skip = (currentPage - 1) * limit;

        // Build the filter query
        const filterQuery: FilterPropsType = {};

        // Apply filters if provided
        if (filter) {
          if (filter.isActive !== undefined) {
            filterQuery.isActive = filter.isActive;
          }
          if (filter.title) {
            filterQuery.title = {
              $regex: filter.title,
              $options: "i",
            }; // Case-insensitive search
          }
        }

        // Fetch the total count of competitions matching the filter (for pagination)
        const totalCount = await Competition.countDocuments(filterQuery);

        // Fetch the paginated competitions
        let competitions = await Competition.find(filterQuery)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .populate("enroledUserCount"); // Sort by creation date, newest first
        // Fetch enrolment counts for all competitions in a single query

        return {
          competitions,
          totalCount,
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
  Mutation: {
    createCompetition: async (
      _: void,
      {
        input,
      }: {
        input: {
          title: string;
          description: string;
          competitionDeadline: {
            startDate: string;
            endDate: string;
          };
          enrollmentDeadline: {
            startDate: string;
            endDate: string;
          };
          enrollmentType: string;
          price: number;
          mediaUrl: string;
          submissionType: SubmissionTypeEnum;
          status: CompetitionStatusEnum;
          haveRoundWiseSubmission: boolean;
        };
      }
    ): Promise<ICompetition> => {
      try {
        const {
          title,
          description,
          enrollmentType,
          price,
          submissionType,
          enrollmentDeadline,
          competitionDeadline,
          status,
          haveRoundWiseSubmission,
        } = input;
        console.log("INPUT FROM RESOLVER", input);
        const newCompetition = new Competition({
          title,
          description,
          enrollmentDeadline: {
            startDate: new Date(enrollmentDeadline.startDate as string),
            endDate: new Date(enrollmentDeadline.endDate as string),
          },
          competitionDeadline: {
            startDate: new Date(competitionDeadline.startDate as string),
            endDate: new Date(competitionDeadline.endDate as string),
          },
          enrollmentType,
          price,
          submissionType,
          haveRoundWiseSubmission,
          status: status || CompetitionStatusEnum.DRAFT, // Default to DRAFT if not provided
        });

        // Save to database
        const savedCompetition = await newCompetition.save();
        // Return the saved competition
        return savedCompetition;
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
    updateCompetition: async (
      _: void,
      {
        input,
        id,
      }: {
        input: {
          title: string;
          description: string;
          startDate: string;
          endDate: string;
          enrollmentDeadline: {
            startDate: string;
            endDate: string;
          };
          enrollmentType: string;
          price: number;
          mediaUrl: string;
          submissionType: SubmissionTypeEnum;
          status: CompetitionStatusEnum;
          haveRoundWiseSubmission: boolean;
        };
        id: string;
      }
    ): Promise<ICompetition | null> => {
      try {
        const {
          title,
          description,
          startDate,
          endDate,
          enrollmentType,
          price,
          submissionType,
          enrollmentDeadline,
          status,
          haveRoundWiseSubmission,
        } = input;
        const competition = await Competition.findByIdAndUpdate(
          id,
          {
            title,
            description,
            startDate: new Date(startDate as string),
            endDate: new Date(endDate as string),
            enrollmentDeadline: {
              startDate: new Date(enrollmentDeadline.startDate as string),
              endDate: new Date(enrollmentDeadline.endDate as string),
            },
            enrollmentType,
            price,
            submissionType,
            haveRoundWiseSubmission,
            status: status || CompetitionStatusEnum.DRAFT, // Default to DRAFT if not provided
          },
          { new: true }
        );
        if (!competition) {
          throw new GraphQLError("Competition not found", {
            extensions: {
              code: "COMPETITION_NOT_FOUND",
            },
          });
        }
        return competition;
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
    deleteCompetition: async (
      _: void,
      { id }: { id: string }
    ): Promise<ICompetition | null> => {
      return await Competition.findByIdAndDelete(id);
    },
    createPrize: async (
      _: void,
      {
        input,
        id,
      }: {
        input: {
          title: string;
          position: number;
          totalAwardws: number;
          rewards: string;
        };
        id: string;
      }
    ): Promise<IPrizesAndRewards> => {
      try {
        const { title, position, totalAwardws, rewards } = input;
        // Update the competition by pushing the new prize into the prizes array
        const competition = await Competition.findOneAndUpdate(
          { _id: id }, // Match the competition by ID
          {
            $push: {
              prizes: {
                title,
                position,
                totalAwardws,
                rewards,
              },
            },
          },
          { new: true } // Return the updated competition document with the updated prizes array
        );
        if (!competition) {
          throw new GraphQLError("Competition not found", {
            extensions: {
              code: "COMPETITION_NOT_FOUND",
            },
          });
        }
        return competition.prizes;
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
    updatePrize: async (
      _: void,
      {
        input,
        id: competitionId,
      }: {
        input: {
          id: string;
          title: string;
          position: number;
          totalAwardws: number;
          rewards: string;
        };
        id: string;
      }
    ): Promise<IPrizesAndRewards> => {
      try {
        const { id, title, position, totalAwardws, rewards } = input;
        const competition = await Competition.findOneAndUpdate(
          { _id: competitionId, "prizes.id": id }, // Match the competition by ID and prize id
          {
            $set: {
              "prizes.$": {
                // Use the positional operator to update the matched prize
                id,
                title,
                position,
                totalAwardws,
                rewards,
              },
            },
          },
          { new: true } // Return the updated competition document
        );

        if (!competition) {
          throw new GraphQLError("Competition not found", {
            extensions: {
              code: "COMPETITION_NOT_FOUND",
            },
          });
        }
        // Return the updated list of prizes
        return competition.prizes; // The entire list of prizes is now updated
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
    deletePrize: async (
      _: void,
      { id, competitionId }: { id: string; competitionId: string }
    ): Promise<ICompetition | null> => {
      try {
        const competition = await Competition.findOneAndUpdate(
          { _id: competitionId }, // Match competition by ID
          { $pull: { prizes: { _id: id } } }, // Pull prize from the prizes array
          { new: true } // Return the updated competition document
        );
        if (!competition) {
          throw new GraphQLError("Competition not found", {
            extensions: {
              code: "COMPETITION_NOT_FOUND",
            },
          });
        }
        // Return the updated prizes array
        return competition.prizes;
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
    updateEligibility: async (
      _: void,
      {
        id,
        eligibility,
      }: {
        id: string;
        eligibility: string;
      }
    ): Promise<Pick<ICompetition, "eligibility">> => {
      try {
        const competition = await Competition.findByIdAndUpdate(
          id, // Match the competition by ID and prize id
          {
            eligibility,
          },
          { new: true } // Return the updated competition document
        );

        if (!competition) {
          throw new GraphQLError("Competition not found", {
            extensions: {
              code: "COMPETITION_NOT_FOUND",
            },
          });
        }
        // Return the updated list of prizes
        return { eligibility: competition.eligibility }; // The entire list of prizes is now updated
      } catch (error) {
        console.log("UPDATE ERROR ELIGIBILITY", error);
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
  },
  Competition: {
    rounds: async (competition: ICompetition) => {
      return await Round.find({ competition: competition.id }).populate(
        "judges"
      );
    },
    mySubmission: async (
      competition: ICompetition,
      _: unknown,
      { user }: { user: IUser | null }
    ) => {
      if (!user) return null;
      const rounds = await Round.find({ competition: competition.id }).select(
        "_id"
      );
      const submission = await EnrollmentSubmission.find({
        userId: user.id,
        roundId: { $in: rounds },
      });
      return submission;
    },
  },
};

export default competitionResolver;
