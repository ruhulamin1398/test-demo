import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function guestMiddleware(
  request: NextRequest
): Promise<void | NextResponse<unknown>> {
  const session = await getServerSession(authOptions);
  if (session) {
    // ✅ Token is valid → Redirect logged-in users away from login pages
    return NextResponse.redirect(new URL("/", request.url));
  }
}
