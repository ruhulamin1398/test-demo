import { deleteTokenCookie, setTokenCookie } from "@/app/lib/auth";
import { getResolverErrorMessage } from "@/app/lib/utils";
import {
  IUser,
  PaginationInput,
  UserFilterInput,
  UsersResponse,
} from "@/interfaces";
import { User } from "@/models"; // Assuming your model is exported from this path
import { GraphQLError } from "graphql";
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
        throw new Error("Not authenticated");
      }
      try {
        const { email, phoneNumber } = user;
        const findMe = await User.findOne({
          $or: [
            { email },
            {
              "phone.countryCode": phoneNumber?.countryCode,
              "phone.number": phoneNumber?.number,
            },
          ],
        });
        if (!findMe) throw new Error("User could not found.");
        return findMe;
      } catch (_error: unknown) {
        throw new Error("Something wents wrong, we are looking into it.");
      }
    },
    getUsers: async (
      _parent: unknown, // Parent object (could be null or previous result)
      { page, filter }: { page: PaginationInput; filter?: UserFilterInput }, // Args with pagination and optional filter
      _context: unknown, // Context (e.g., for authentication)
      _info: unknown // Info about the query (e.g., field name, schema)
    ): Promise<UsersResponse> => {
      try {
        type FilterPropsType = {
          username?: { $regex: string; $options: string };
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
          if (filter.username) {
            filterQuery.username = { $regex: filter.username, $options: "i" }; // Case-insensitive search
          }
        }

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
    // Create a new user
    createUser: async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _parent: any,
      {
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      }: {
        username: string;
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: PhoneNumberInput;
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _context: unknown
    ) => {
      try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({
          $or: [{ username }, { email }],
        });
        if (existingUser) {
          throw new GraphQLError("User already exists", {
            extensions: {
              code: "USER_ALREADY_EXISTS", // Custom error code
              invalidArgs: { email, username },
            },
          });
        }

        // Create a new user instance
        const newUser = new User({
          username,
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          isActive: true,
        });

        // Save the new user to the database
        await newUser.save();
        const userPlainObject = newUser.toObject();
        await setTokenCookie(userPlainObject);
        return { user: newUser };
      } catch (err) {
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

    // Update Profile Avatar
    updateProfileAvatar: async (
      _parent: unknown,
      { avatarUrl }: { avatarUrl: string },
      context: { user: unknown }
    ) => {
      const userId = (context.user as IUser).id; // You can get the logged-in user ID from the context

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Update avatar URL
      user.avatar = avatarUrl;
      await user.save();

      return user;
    },

    // Update General Info (first name, last name, phone number)
    updateGeneralInfo: async (
      _parent: unknown,
      {
        firstName,
        lastName,
        phoneNumber,
      }: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: PhoneNumberInput;
      },
      context: { userId: string }
    ) => {
      const userId = context.userId;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Update the fields if provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (phoneNumber) user.phoneNumber = phoneNumber;

      await user.save();

      return user;
    },
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
      try {
        console.log({ username, password });
        const user = await User.findOne({ username }).select("+password");

        if (!user)
          throw new GraphQLError("Invalid username or password", {
            extensions: {
              code: "UNAUTHENTICATED", // Custom error code for authentication issues
              http: { status: 401 }, // HTTP Status Code for Unauthorized
            },
          });

        const validPassword = await user.comparePassword(password);
        if (!validPassword)
          throw new GraphQLError("Invalid username or password", {
            extensions: {
              code: "UNAUTHENTICATED", // Custom error code for authentication issues
              http: { status: 401 }, // HTTP Status Code for Unauthorized
            },
          });
        const leanUser = user.toObject();
        delete leanUser.password;
        user.password = undefined;
        await setTokenCookie(leanUser);
        return {
          user,
        };
      } catch (err) {
        if (err instanceof GraphQLError) {
          throw err;
        }

        // Handle any unexpected errors and throw a general GraphQL error
        throw new GraphQLError("An error occurred during login", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR", // Code for internal server errors
            http: { status: 500 }, // HTTP Status Code for Internal Server Error
          },
        });
      }
    },
    logout: async () => {
      await deleteTokenCookie();
      return {
        success: true,
      };
    },
  },
};

export default resolvers;
