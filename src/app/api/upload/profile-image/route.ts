import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";
import { uuidv4 } from "minimal-shared/utils";
import { User } from "@/models";
const absolutePath = "/uploads/user/profile-image";
// const publicPath = "/public/uploads";

// Enable parsing of form data
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser for file uploads
  },
};

export async function POST(req: NextRequest) {
  try {
    // Parse the form data using `req.formData()`
    const formData = await req.formData();
    console.log("formData is : _______________", formData);

    // Extract the uploaded file and ID from formData
    const uploadedFile = formData.get("file");

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
    const loggedUser = await User.findOne({ email: session?.user?.email });
    if (!loggedUser) {
      throw new Error(" No user found in database ");
    }
    // Prepare the file details
    const { name: originalFilename } = uploadedFile;

    // add unique id
    const uniqueId = uuidv4();
    const newFileName = `${uniqueId}${path.extname(originalFilename)}`;
    let submittedContentDir = `${absolutePath}/${loggedUser?.id}`;

    let uploadDir = path.resolve(`./public/${absolutePath}`, loggedUser?.id);
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Path where the file will be stored
    const newFilePath = path.join(uploadDir, newFileName);
    // Convert the file to a Buffer and save it
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    await connectToDatabase();
    await fs.writeFile(newFilePath, fileBuffer);
    const uploadedFileUrl = `${submittedContentDir}/${newFileName}`;

    await User.updateOne(
      { _id: loggedUser._id },
      { $set: { profilePicture: uploadedFileUrl } }
    );
    const updatedUser = await User.findById(loggedUser._id);
    console.log("updatedUser is : ______________ ", updatedUser);

    return NextResponse.json(
      {
        data: uploadedFileUrl,
        success: true,
        message: "File uploaded successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
