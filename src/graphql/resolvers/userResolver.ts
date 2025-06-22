import { getResolverErrorMessage } from "@/app/lib/utils";
import {
  IUser,
  PaginationInput,
  RoleEnum,
  UserFilterInput,
  UsersResponse,
} from "@/interfaces";
import { Enrollment, User } from "@/models"; // Assuming your model is exported from this path
import EnrollmentSubmission from "@/models/EnrollmentSubmission";
import { GraphQLError } from "graphql";
import { FilterQuery } from "mongoose";
import { NextApiRequest } from "next";

interface PhoneNumberInput {
  countryCode: string;
  number: string;
}
const resolvers = {
  Query: {
    // Fetch the current logged-in user (using the JWT token from cookies)
    me: async (
      _: unknown,
      __: unknown,
      { req: _req, user }: { req: NextApiRequest; user: IUser | null }
    ) => {
      if (!user) {
        // user fetch error
        throw new Error("Not authenticated");
      }
      try {
        const { email, phoneNumber } = user;
        const findMe = await User.findOne({
          $or: [
            { email },
            {
              "phoneNumber.countryCode": phoneNumber?.countryCode,
              "phoneNumber.number": phoneNumber?.number,
            },
          ],
        });
        if (!findMe) throw new Error("User could not be found.");
        return findMe;
      } catch (_error: unknown) {
        console.log(_error);
        throw new Error("Something went wrong, we are looking into it.");
      }
    },
    getUser: async (_: void, { id }: { id: string }): Promise<IUser | null> => {
      const user = await User.findById(id);
      return user;
    },
    getUsers: async (
      _parent: unknown, // Parent object (could be null or previous result)
      { page, filter }: { page: PaginationInput; filter?: UserFilterInput }, // Args with pagination and optional filter
      _context: unknown, // Context (e.g., for authentication)
      _info: unknown // Info about the query (e.g., field name, schema)
    ): Promise<UsersResponse> => {
      try {
        type FilterPropsType = FilterQuery<IUser>;
        const { limit, page: currentPage } = page;

        // Calculate the skip value for pagination
        const skip = currentPage * limit;

        // Build the filter query
        const filterQuery: FilterPropsType = {};

        // Apply filters if provided
        if (filter) {
          if (filter.isActive !== undefined) {
            filterQuery.isActive = filter.isActive;
          }

          if (filter.name) {
            filterQuery.$or = [
              { email: { $regex: filter.name, $options: "i" } },
              {
                name: { $regex: filter.name, $options: "i" },
              },
              { "phoneNumber.number": { $regex: filter.name, $options: "i" } },
            ];
          }
          if (filter.role) {
            filterQuery.role = filter.role; // Assuming role is a direct field in User
          }
        }

        console.log(filterQuery);

        // Fetch the total count of users matching the filter (for pagination)
        const totalCount = await User.countDocuments(filterQuery);

        // Fetch the paginated users
        const users = await User.find(filterQuery)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }); // Sort by creation date, newest first

        return {
          users,
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
    // Create a new user (regular credentials-based registration)
    createUser: async (
      _parent: unknown,
      {
        name,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      }: {
        name: string;
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: PhoneNumberInput;
      },
      _context: unknown
    ) => {
      try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new GraphQLError("User already exists", {
            extensions: {
              code: "USER_ALREADY_EXISTS", // Custom error code
              invalidArgs: { email },
            },
          });
        }
        // Create a new user instance
        const newUser = new User({
          name,
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          isActive: true,
          authProvider: "custom", // Set to CUSTOM for regular registration
        });
        await newUser.save();
        const userPlainObject = newUser.toObject();
        console.log("userPlainObject===============", userPlainObject);
        return { user: newUser };
      } catch (err) {
        console.log("Error while creating user", err);
        if (
          err instanceof GraphQLError &&
          err.extensions.code === "USER_ALREADY_EXISTS"
        ) {
          throw err;
        }
        throw new GraphQLError("Internal server error", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },
    updateGeneralInfo: async (
      _parent: unknown,
      {
        id,
        input,
      }: {
        input: {
          email: string;
          firstName?: string;
          lastName?: string;
          phoneNumber?: PhoneNumberInput;
          country: string;
          gender: string;
          role: RoleEnum;
          dob?: string;
          state?: string;
          city?: string;
          isActive: boolean;
          address?: string;
          zipCode?: string;
        };
        id: string;
      },
      _context: unknown
    ) => {
      try {
        const {
          email,
          firstName,
          lastName,
          phoneNumber,
          gender,
          country,
          state,
          city,
          zipCode,
          address,
          dob,
          isActive,
        } = input;

        const dateOfBirth = dob ? new Date(dob) : dob;

        // Create a new user instance
        const newUser = await User.findByIdAndUpdate(
          id,
          {
            name: `${firstName} ${lastName}`,
            state,
            city,
            zipCode,
            address,
            dob: dateOfBirth,
            email,
            firstName,
            gender,
            country,
            lastName,
            phoneNumber,
            isActive, // Set to CUSTOM for regular registration
          },
          { new: true }
        );
        return { user: newUser };
      } catch (err) {
        console.log("Error while creating user", err);
        if (
          err instanceof GraphQLError &&
          err.extensions.code === "USER_ALREADY_EXISTS"
        ) {
          throw err;
        }
        throw new GraphQLError("Internal server error", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },
    // Social login (Google/Facebook)
    socialLogin: async (
      _parent: unknown,
      {
        socialId,
        email,
        firstName,
        lastName,
        phoneNumber,
        authProvider,
      }: {
        socialId: string;
        email: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: PhoneNumberInput;
        authProvider: "GOOGLE" | "FACEBOOK"; // Only Google or Facebook for social login
      },
      _context: unknown
    ) => {
      try {
        // Check if the user exists with the social ID
        const existingUser = await User.findOne({ socialId });
        if (existingUser) {
          return { user: existingUser };
        }
        const name = email.split("@")[0];

        // If user does not exist, create a new user
        const newUser = new User({
          name,
          email,
          password: "asdfsadfs1df54sa65543-099",
          firstName,
          lastName,
          phoneNumber,
          authProvider,
          socialId,
          isActive: true,
        });

        console.log(" generated user is  ===== ", newUser);

        // Save the new user to the database
        await newUser.save();
        const userPlainObject = newUser.toObject();
        console.log("Spcoal login data", userPlainObject);
        return { user: userPlainObject };
      } catch (err) {
        console.log("SOCIAL LOGIN ERROR", err);
        if (err instanceof GraphQLError) {
          throw err;
        }
        throw new GraphQLError("Error during social login", {
          extensions: {
            code: "SOCIAL_LOGIN_ERROR",
            http: { status: 500 },
          },
        });
      }
    },

    // Regular login (credentials-based login)
    login: async (
      _parent: unknown,
      {
        username,
        password,
      }: {
        username: string;
        password: string;
      }
    ) => {
      console.log("HERE YOU Go!", { username, password });
      try {
        const user = await User.findOne({ email: username }).select(
          "+password"
        );
        console.log("Hey your data is", { email: username }, user);
        if (!user)
          throw new GraphQLError("Invalid email or password", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });

        const validPassword = await user.comparePassword(password);
        if (!validPassword)
          throw new GraphQLError("Invalid email or password", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });

        const leanUser = user.toObject();
        delete leanUser.password;
        user.password = undefined;
        return {
          user,
        };
      } catch (err) {
        if (err instanceof GraphQLError) {
          throw err;
        }
        throw new GraphQLError("An error occurred during login", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },

    // Logout user by deleting the token
    logout: async () => {
      return {
        success: true,
      };
    },
  },
  User: {
    // Custom resolver for the 'phoneNumber' field
    enrollIds: async (user: IUser) => {
      const enrollments = (await Enrollment.find({ userId: user.id })).map(
        (enrollment) => enrollment.competitionId
      );
      return enrollments;
    },
    submissions: async (user: IUser) => {
      const submissionList = await EnrollmentSubmission.find({
        userId: user.id,
      });
      return submissionList;
    },
  },
};

export default resolvers;
