import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Competition, Enrollment, Round } from "@/models";
import { authOptions } from "../../auth/[...nextauth]/route";
import { uuidv4 } from "minimal-shared/utils";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import EnrollmentSubmission from "@/models/EnrollmentSubmission";
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
  dayjs.extend(isBetween);
  try {
    const competition = await Competition.findById(competitionId);
    // console.log(" competition is ", competition);
    if (!competition) {
      throw new Error("The specified competition does not exist.");
    }

    // check enrollment exist or not
    const enrollment = await Enrollment.findOne({
      competitionId,
      userId,
    });

    if (!enrollment) {
      throw new Error("You are not enrolled in this competition.");
    }

    const haveRoundWiseSubmission = competition.haveRoundWiseSubmission;

    /// if not roundwise submission  check enrollment deadline
    if (!haveRoundWiseSubmission) {
      const isDeadlineExist = dayjs().isBetween(
        competition.submission?.startDate,
        competition.submission?.endDate,
        "day",
        "[]"
      ); // '[]' means inclusive
      if (!isDeadlineExist) {
        throw new Error(
          "Submissions are only allowed during the submission period."
        );
      }

      const round = await Round.findOne({
        competition: competitionId,
      });

      if (!round) {
        throw new Error("No round is associated with this competition.");
      }

      // revert if alreay submitted
      const existingSubmission = await EnrollmentSubmission.findOne({
        roundId: round.id,
        enrolId: enrollment.id,
        userId,
      });

      if (existingSubmission) {
        throw new Error("You have already submitted for this round.");
      }

      return { roundId: round.id, enrolId: enrollment.id };
    }

    // get current active round
    const activeRound = await Round.findOne({
      competition: competitionId,
    });

    if (!activeRound) {
      throw new Error("There is no active round for this competition.");
    }
    // check deadline
    const isDeadlineExist = dayjs().isBetween(
      activeRound.submissionStartDate,
      activeRound.submissionEndDate,
      "day",
      "[]"
    ); // '[]' means inclusive
    if (!isDeadlineExist) {
      throw new Error(
        "Submissions are only allowed during the submission period."
      );
    }

    const existingSubmission = await EnrollmentSubmission.findOne({
      roundId: activeRound.id,
      enrolId: enrollment.id,
      userId,
    });

    if (existingSubmission) {
      throw new Error("You have already submitted for this round.");
    }
    return { roundId: activeRound.id, enrolId: enrollment.id };
  } catch (error) {
    console.error("Error in getRunningRoundId:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error in getRunningRoundId"
    );
  }
};
export async function POST(req: NextRequest) {
  try {
    // Parse the form data using `req.formData()`
    const formData = await req.formData();

    // Extract the uploaded file and ID from formData
    const uploadedFile = formData.get("file");
    const competitionId = formData.get("competitionId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
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
    let submittedContentDir = `${absolutePath}/${competitionId}`;
    let uploadDir = path.resolve(`./public/${absolutePath}`, competitionId);
    if (roundId) {
      uploadDir = path.resolve(
        `./public/${absolutePath}`,
        competitionId,
        roundId
      );
      submittedContentDir += `/${roundId}`;
    }
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Path where the file will be stored
    const newFilePath = path.join(uploadDir, newFileName);
    // Convert the file to a Buffer and save it
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    await connectToDatabase();
    await fs.writeFile(newFilePath, fileBuffer);

    // console.log(
    //   "roundid , enrolId , userId  fileName submittedContentDir filePath  ",
    //   roundId,
    //   enrolId,
    //   session.user.id,
    //   newFileName,
    //   submittedContentDir,
    //   newFilePath
    // );
    // Create a new EnrollmentSubmission document
    const enrollmentSubmission = new EnrollmentSubmission({
      roundId,
      enrolId,
      userId: session.user.id,
      submittedContent: `${submittedContentDir}/${newFileName}`,
      title: title,
      description: description,
    });
    // Save the EnrollmentSubmission to the database
    console.log("enrolmentSubmission to save ", enrollmentSubmission);
    await enrollmentSubmission.save();

    return NextResponse.json({ data: enrollmentSubmission }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
