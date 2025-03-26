import { withAuth } from "next-auth/middleware";

export const authMiddleware = withAuth({
  pages: {
    signIn: "/auth/login", // Redirect to login page if not authenticated
  },
});
