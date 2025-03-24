import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/types";
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { verifyAuthenticationWithRefreshToken } from "@/app/lib/auth";

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
// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler(
  server as ApolloServer<object>,
  {
    context: async (req: NextApiRequest) => {
      try {
        // await runCors(req, res);

    // @TODO: get user from next auth 
        const user = await verifyAuthenticationWithRefreshToken();
        return { req, user };
      } catch (_err) {
        return { req, user: null };
      }
    },
  }
);

export { handler as GET, handler as POST };
