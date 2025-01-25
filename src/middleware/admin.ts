import { verifyAuthenticationWithRefreshToken } from "@/app/lib/auth";
import { RoleEnum } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function adminMiddleware(
  request: NextRequest
): Promise<void | NextResponse<unknown>> {
  try {
    const user = await verifyAuthenticationWithRefreshToken();
    if (!user || user.role !== RoleEnum.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const response = NextResponse.next();
    response.headers.set("X-Is-Dashboard", "true");
    console.log("Admin Middleware");
    return response;
  } catch (_err) {
    // Catch if any
    console.log("guestMiddleware error", _err);
  }
}
