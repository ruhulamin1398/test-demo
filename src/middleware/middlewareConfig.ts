// middlewareConfig.ts

import withAuth from "next-auth/middleware";
import { authMiddleware } from "./auth";
import { adminMiddleware } from "./admin";
import { NextRequest, NextResponse } from "next/server";
import { guestMiddleware } from "./guest";

// Define a type for the middleware handler function
export type MiddlewareHandler = (
  request: NextRequest
) => Promise<NextResponse | void> | NextResponse | void;

export type MiddlewareType = MiddlewareHandler | ReturnType<typeof withAuth>;

// Define the type for each configuration object in the middlewareConfig
export interface PathMiddlewareConfig {
  matcher: string; // Path pattern to match (e.g., /profile/*)
  middlewares: MiddlewareType[]; // List of middlewares to apply for the matching path
}

// Define the type for the middlewareConfig array
export type MiddlewareConfig = PathMiddlewareConfig[];

// Define the middleware configuration for paths
export const middlewareConfig: MiddlewareConfig = [
  {
    matcher: "/dashboard",
    middlewares: [authMiddleware, adminMiddleware],
  },

  {
    matcher: "/profile",
    middlewares: [authMiddleware],
  },
  {
    matcher: "/auth",
    middlewares: [guestMiddleware],
  },
];

export default middlewareConfig;
