import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Competition, Enrolment, Round } from "@/models";
import { authOptions } from "../../auth/[...nextauth]/route";
import { uuidv4 } from "minimal-shared/utils";
import EnrolmentSubmission from "@/models/EnrolmentSubmission";

const absolutePath = "/uploads/competition-image";
// const publicPath = "/public/uploads";

// Enable parsing of form data
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser for file uploads
  },
};

const getRunningRoundId = async ({
  competitionId,
  userId,
}: {
  competitionId: string;
  userId: string;
}) => {
  // console.log(" competitionid user id", competitionId, userId);
  try {
    const competition = await Competition.findById(competitionId);
    // console.log(" competition is ", competition);
    if (!competition) {
      throw new Error("Competition not found");
    }

    // check enrolment exist or not
    const enrolment = await Enrolment.findOne({
      competitionId,
      userId,
    });

    if (!enrolment) {
      throw new Error(" User not enroled");
    }

    const haveRoundWiseSubmission = competition.haveRoundWiseSubmission;
    const currentDate = new Date();

    /// if not roundwise submission  check enrolment deadline
    if (!haveRoundWiseSubmission) {
      const enrolmentDeadline = competition.enrolmentDeadline?.endDate;

      if (!enrolmentDeadline) {
        throw new Error(
          "Enrolment deadline does not exist for this competition"
        );
      }

      if (currentDate > new Date(enrolmentDeadline)) {
        throw new Error("Enrolment deadline has passed");
      }
    }

    // get current active round
    const activeRound = await Round.findOne({
      competition: competitionId,
      isActiveRound: true,
    });

    if (!activeRound) {
      throw new Error("No Active round found");
    }
    // check deadline
    if (currentDate > new Date(activeRound?.endDate)) {
      throw new Error("Enrolment deadline has passed");
    }

    return { roundId: activeRound.id, enrolId: enrolment.id };
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

    // current user
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error(" No user found ");
    }

    // Prepare the file details
    const { name: originalFilename } = uploadedFile;

    const { roundId, enrolId } = await getRunningRoundId({
      competitionId,
      userId: session?.user?.id,
    });

    // add unique id
    const uniqueId = uuidv4();
    const newFileName = `${uniqueId}${path.extname(originalFilename)}`;
    let submittedContent = `${absolutePath}/${competitionId}`;
    let uploadDir = path.resolve(`./public/${absolutePath}`, competitionId);
    if (roundId) {
      uploadDir = path.resolve(
        `./public/${absolutePath}`,
        competitionId,
        roundId
      );
      submittedContent += `/${roundId}`;
    }
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Path where the file will be stored
    const newFilePath = path.join(uploadDir, newFileName);
    // Convert the file to a Buffer and save it
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    await connectToDatabase();
    await fs.writeFile(newFilePath, fileBuffer);

    console.log(
      "roundid , enrolId , userId  fileName submittedContent filePath  ",
      roundId,
      enrolId,
      session.user.id,
      newFileName,
      submittedContent,
      newFilePath
    );
    // Create a new EnrolmentSubmission document
    const enrolmentSubmission = new EnrolmentSubmission({
      roundId,
      enrolId,
      userId: session.user.id,
      submittedContent,
    });
    // Save the EnrolmentSubmission to the database
    await enrolmentSubmission.save();

    return NextResponse.json({ data: enrolmentSubmission }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
