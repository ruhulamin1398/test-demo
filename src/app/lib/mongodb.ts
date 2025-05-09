import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";
const MONGODB_URI =
  process.env.MONGO_ATLAS_URL ||
  "mongodb+srv://nizamsuet:D0CK08AOW5YkS3O3@contesta-cluster.kbo45.mongodb.net/?retryWrites=true&w=majority&appName=contesta-cluster";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  // Check if a connection already exists
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(MONGODB_URI);
  } catch (_error) {
    // Log connection error
    process.exit(1); // Exit the process if connection fails
  }

  // Event listeners for MongoDB connection lifecycle events
  mongoose.connection.on("connected", () => {
    console.info("Mongoose connected to the database");
  });

  mongoose.connection.on("disconnected", () => {
    console.error("Mongoose disconnected from the database");
  });

  mongoose.connection.on("error", (error) => {
    console.error(`MongoDB connection error: ${error.message}`);
  });

  // Handling termination signals to cleanly close the connection
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.info("Mongoose connection closed due to application termination");
    process.exit(0);
  });
}
