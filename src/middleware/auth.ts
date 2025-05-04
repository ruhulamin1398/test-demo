import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { MiddlewareFactory } from "./middleware.config"; // Your existing middleware chaining setup
import { getToken } from "next-auth/jwt";

export const authMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const token = await getToken({
      req: request,
      secret:
        process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ||
        "1a99663db926903959c25fe59d333d61",
    });
    if (!token) {
      const url = new URL(`/auth/login`, request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("next-auth.callback-url", request.nextUrl.href, {
        path: "/",
      });
      return response;
    }

    // Otherwise, continue to the next middleware
    return next(request, event);
  };
};
