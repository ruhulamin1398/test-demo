import { RoleEnum } from "@/interfaces";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MiddlewareFactory } from "./middlewareConfig";

// Define the middleware factory function
export const adminMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    try {
      // Get the session using NextAuth
      const session = await getServerSession(authOptions);

      // If the session is missing or user is not an admin, redirect
      if (!session || session?.user?.role !== RoleEnum.ADMIN) {
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
      }

      // Otherwise, continue with the next middleware or response
      const response = NextResponse.next();
      response.headers.set("X-Is-Dashboard", "true");
      console.log("Admin Middleware");

      // Return the response after the header has been set
      return next(request, event);
    } catch (_err) {
      // Handle errors and provide a fallback for API routes or other cases
      console.log("Admin Middleware Error", _err);
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
  };
};
