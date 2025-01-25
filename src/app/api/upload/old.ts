import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, File } from "formidable"; // Importing types from formidable
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Competition } from "@/models";

// Create an instance of IncomingForm for handling file uploads
export const POST = async (req: NextRequest) => {
  return new Promise<NextResponse>(async (resolve, reject) => {
    // Create the upload directory path
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create an instance of IncomingForm and pass options
    const form = new IncomingForm({
      uploadDir, // Specify the upload directory here
      keepExtensions: true, // Option to keep file extensions
    });

    // Use `any` casting to access internal properties (or better type as IncomingForm for custom usage)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeReq = (req as any)?.body; // Casting to 'any' allows us to access the internal properties

    try {
      // Parse the incoming request (multipart form data)
      form.parse(nodeReq, async (err, fields, files) => {
        if (err) {
          console.error(err);
          return reject(
            new NextResponse("Error parsing file upload", { status: 500 })
          );
        }

        // Check if a file is uploaded
        const uploadedFile = files.file as unknown as File; // Typecasting to `File`
        if (!uploadedFile) {
          return reject(new NextResponse("No file uploaded", { status: 400 }));
        }

        // Assuming you want to update a specific Competition record
        const competitionId = fields.id as unknown as string; // Accessing `id` from fields
        if (!competitionId) {
          return reject(
            new NextResponse("Competition ID is required", { status: 400 })
          );
        }

        // Renaming the file to ensure uniqueness
        const fileExtension = path.extname(uploadedFile.originalFilename || "");
        const newFileName = `${competitionId}${fileExtension}`;
        const newFilePath = path.join(uploadDir, newFileName); // Create new file path in the public directory
        const mediaUrl = `/uploads/${newFileName}`; // URL for the uploaded file

        // Rename and move the file to the uploads directory
        fs.renameSync(uploadedFile.filepath, newFilePath); // `uploadedFile.filepath` gives the temp file path

        // Connect to MongoDB
        await connectToDatabase();

        // Update the Competition model with the new media URL
        const updatedCompetition = await Competition.findByIdAndUpdate(
          competitionId,
          { mediaUrl },
          { new: true } // Return the updated document
        );

        if (!updatedCompetition) {
          return reject(
            new NextResponse("Competition not found", { status: 404 })
          );
        }

        // Return the updated competition with the new media URL
        return resolve(
          new NextResponse(JSON.stringify(updatedCompetition), { status: 200 })
        );
      });
    } catch (error) {
      console.error(error);
      return reject(
        new NextResponse("An unexpected error occurred", { status: 500 })
      );
    }
  });
};
