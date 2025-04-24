import { RoleEnum } from "@/interfaces";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { MiddlewareFactory } from "./middleware.config";
import { getToken } from "next-auth/jwt";

// Define the middleware factory function
export const adminMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    try {
      const token = await getToken({
        req: request,
        secret:
          process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ||
          "1a99663db926903959c25fe59d333d61",
      });
      // @TODO: Check if the token is valid and the user is an admin
      // if (token && token.role === RoleEnum.ADMIN) {
      return next(request, event);
      // }
      // Redirect non-admin users to the home page
      // return NextResponse.redirect(new URL("/", request.url));
    } catch (_error) {
      // @TODO: Handle error when token is not valid
      return NextResponse.next();
    }
  };
};
