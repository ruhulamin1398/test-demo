// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { middlewareConfig } from "@/middleware/middlewareConfig";

// The `middleware` function runs before any request handler and checks for relevant middleware
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.pathname;

  // Loop through all matchers in the middlewareConfig and apply the relevant middlewares
  for (const { matcher, middlewares } of middlewareConfig) {
    // Check if the URL path matches the current matcher pattern
    if (url.startsWith(matcher)) {
      // Apply each middleware function in the current path's middlewares list
      for (const middlewareFn of middlewares) {
        const result = await middlewareFn(request);
        if (result) {
          return result; // If a middleware returns a response, stop further processing
        }
      }
    }
  }

  // If no middleware handled the request, proceed with the default response
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/profile/:path*", "/dashboard/:path*", "/auth/:path*"],
};
