// middlewareConfig.ts

import { NextMiddleware } from "next/server";
import { authMiddleware } from "./auth";
import { adminMiddleware } from "./admin";
import { guestMiddleware } from "./guest";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

// Define the type for each configuration object in the middlewareConfig
export interface PathMiddlewareConfig {
  matcher: string; // Path pattern to match (e.g., /profile/*)
  middlewares: MiddlewareFactory[]; // List of middlewares to apply for the matching path
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
