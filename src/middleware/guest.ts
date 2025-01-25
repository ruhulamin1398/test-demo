import { verifyAuthenticationWithRefreshToken } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function guestMiddleware(
  request: NextRequest
): Promise<void | NextResponse<unknown>> {
  try {
    const user = await verifyAuthenticationWithRefreshToken();
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (_err) {
    // Catch if any
    console.log("guestMiddleware error", _err);
  }
}
