import { RoleEnum } from "@/interfaces";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MiddlewareFactory } from "./middlewareConfig";
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
    } catch (error) {
      // @TODO: Handle error when token is not valid
      return NextResponse.next();
    }
  };
};
