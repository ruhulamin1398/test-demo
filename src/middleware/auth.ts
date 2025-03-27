import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextFetchEvent } from "next/server";
import { MiddlewareFactory } from "./middlewareConfig"; // Your existing middleware chaining setup

export const authMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Use withAuth to check authentication
    const authResponse = await withAuth({
      pages: {
        signIn: "/auth/login", // Redirect to login page if not authenticated
      },
    })(request as NextRequestWithAuth, event);

    // If the authentication middleware returns a response (e.g., a redirect), return it
    if (authResponse) return authResponse;

    // Otherwise, continue to the next middleware
    return next(request, event);
  };
};
