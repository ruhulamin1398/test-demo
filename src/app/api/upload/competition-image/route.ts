import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Competition, Round } from "@/models";

const absolutePath = "./public/uploads/competition-image";
// const publicPath = "/public/uploads";

// Enable parsing of form data
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser for file uploads
  },
};

const getRunningRoundId = async (competitionId: string) => {
  try {
    const competition = await Competition.findById(competitionId);
    // console.log(" competition is ", competition);
    if (!competition) {
      throw new Error("Competition not found");
    }

    if (!competition.haveRoundWiseSubmission) {
      return "default";
    }

    const activeRound = await Round.findOne({
      competition: competitionId,
      isActiveRound: true,
    });

    if (!activeRound) {
      throw new Error("No Active round found");
    }

    return activeRound.id;
  } catch (error) {
    console.error("Error in getRunningRoundId:", error);
    throw new Error("Failed to get running round ID");
  }
};
export async function POST(req: NextRequest) {
  try {
    // Parse the form data using `req.formData()`
    const formData = await req.formData();

    // Extract the uploaded file and ID from formData
    const uploadedFile = formData.get("file");
    const competitionId = formData.get("competitionId") as string;
    if (!competitionId) {
      throw new Error("No competition id provided ");
    }
    // Validate file presence
    if (!uploadedFile || Array.isArray(uploadedFile)) {
      return NextResponse.json(
        { success: false, message: "Invalid file upload" },
        { status: 400 }
      );
    }

    // Ensure the uploaded file is an instance of File
    if (!(uploadedFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Uploaded item is not a valid file." },
        { status: 400 }
      );
    }

    // Optional: Validate the file size or type (for example, 5MB limit)
    if (uploadedFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File is too large" },
        { status: 400 }
      );
    }

    // Prepare the file details
    const { name: originalFilename } = uploadedFile;

    const roundId = await getRunningRoundId(competitionId);

    // Use the provided 'id' for a unique filename, or default to "default"
    const newFileName = `${competitionId || "default"}${path.extname(
      originalFilename
    )}`;
    let uploadDir = path.resolve(absolutePath, competitionId);
    if (roundId) {
      uploadDir = path.resolve(absolutePath, competitionId, roundId);
    }

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Path where the file will be stored
    const newFilePath = path.join(uploadDir, newFileName);
    // Convert the file to a Buffer and save it
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    await connectToDatabase();
    await fs.writeFile(newFilePath, fileBuffer);
    // Update the Competition model with the new media URL
    const updatedCompetition = await Competition.findById(competitionId);
    //
    // // const updatedCompetition = await Competition.findByIdAndUpdate(
    //   competitionId,
    //   { mediaUrl: "/uploads/competition-image/" + newFileName },
    //   { new: true } // Return the updated document
    // );

    // if (!updatedCompetition) {
    //   return NextResponse.json(
    //     { message: "Competition could not found" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({ data: updatedCompetition }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
