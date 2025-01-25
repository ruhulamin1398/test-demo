import { GraphQLUpload } from "graphql-upload-ts";
import path from "path";
import fs from "fs";
import { ICompetition } from "@/interfaces";
import { Competition } from "@/models";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// Define resolver for file upload
const resolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    uploadCompetitionThubmnail: async (
      _: unknown,
      { file, id }: { file: any; id: string }
    ): Promise<ICompetition> => {
      console.log("PROCESSED RESOLVER", file);
      const { createReadStream, filename } = await file;

      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const filePath = path.join(uploadDir, filename);

      const writeStream = fs.createWriteStream(filePath);
      createReadStream().pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      const updatedCompetition = await Competition.findByIdAndUpdate(
        id, // Find file by ID
        { filename, filePath }, // Fields to update
        { new: true } // Return the updated file
      );

      await updatedCompetition.save();

      // Return the file URL or path (adjust as needed)
      return updatedCompetition;
    },
  },
};

export default resolvers;
