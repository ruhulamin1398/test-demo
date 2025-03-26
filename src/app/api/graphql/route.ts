import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/types";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { IUser } from "@/interfaces";

const uri =
  "mongodb+srv://nizamsuet:D0CK08AOW5YkS3O3@contesta-cluster.kbo45.mongodb.net/?retryWrites=true&w=majority&appName=contesta-cluster";

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to the database.");
      return; // No need to connect again
    }
    if (uri) {
      await mongoose.connect(uri, { dbName: "contesta_app" });
      console.log("🎉 connected to database successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
await connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false, // Disable default body parser so we can use the custom middleware
  },
};

export type GraphQLContext = {
  req: NextApiRequest;
  res?: NextApiResponse; // Make res optional as it might not always be present
  user: any; // Use `any` or define a stricter user type if needed
};

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler(
  server as ApolloServer<object>,
  {
    context: async (graphQlcontext): Promise<GraphQLContext> => {
      const { req, res } = graphQlcontext;
      try {
        // @TODO: get user from next auth

        const session = await getServerSession(req, res, authOptions);
        console.log(
          "Session from NextAuth in GraphQL route:  ____________________________________",
          session
        );

        // Extract the user data
        const user = session?.user || null;

        console.log(
          " log form graphql __________________________________",
          user
        );

        return { req, user };
      } catch (_err) {
        return { req, user: null };
      }
    },
  }
);

export { handler as GET, handler as POST };
