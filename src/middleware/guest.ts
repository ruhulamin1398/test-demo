import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./middlewareConfig";

// Define the middleware factory function
export const guestMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await getServerSession(authOptions);
    if (session) {
      // ✅ Token is valid → Redirect logged-in users away from login pages
      return NextResponse.redirect(new URL("/", request.url));
    }
    return next(request, event);
  };
};
