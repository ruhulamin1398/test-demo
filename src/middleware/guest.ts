import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./middleware.config";
import { getToken } from "next-auth/jwt";

// Define the middleware factory function
export const guestMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const token = await getToken({
      req: request,
      secret:
        process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ||
        "1a99663db926903959c25fe59d333d61",
    });
    if (token) {
      // ✅ Token is valid → Redirect logged-in users away from login pages
      return NextResponse.redirect(new URL("/", request.url));
    }
    return next(request, event);
  };
};
