// middleware.ts

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { middlewareConfig } from "@/middleware/middleware.config";
import { stackMiddlewares } from "@/middleware/middleware.chaining";

// The `middleware` function runs before any request handler and checks for relevant middleware
export async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<NextResponse> {
  try {
    const pathname = request.nextUrl.pathname;

    // Find the middleware configuration for the current path
    const pathConfig = middlewareConfig.find((config) =>
      pathname.startsWith(config.matcher)
    );

    // If there's no specific config for the path, return the default response.
    if (!pathConfig) {
      return NextResponse.next();
    }

    // Chain the middlewares for this specific path
    const { middlewares } = pathConfig;
    const middlewareFn = stackMiddlewares(middlewares);
    const result = await middlewareFn(request, event);
    if (result) {
      return result instanceof NextResponse ? result : NextResponse.next(); // Ensure the result is a NextResponse
    }

    // If no middleware handled the request, proceed with the default response
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error", (error as Error).message);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/:path*", "/profile/:path*", "/dashboard/:path*", "/auth/:path*"],
};
