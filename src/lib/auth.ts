// utils/auth.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticateJWT = (token: string): { id: string } | null => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { id: (decoded as { userId: string }).userId };
  } catch (_err) {
    return null; // Token is invalid
  }
};
