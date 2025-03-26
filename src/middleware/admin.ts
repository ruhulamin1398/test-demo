import { RoleEnum } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function adminMiddleware(
  request: NextRequest
): Promise<void | NextResponse<unknown>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== RoleEnum.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const response = NextResponse.next();
    response.headers.set("X-Is-Dashboard", "true");
    console.log("Admin Middleware");
    return response;
  } catch (_err) {
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    } else {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }
}
