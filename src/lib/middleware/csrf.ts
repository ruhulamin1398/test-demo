import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { cookies } from "next/headers";

// const CSRF_SECRET = process.env.CSRF_SECRET || "your-secret-key";

export const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const setCsrfCookie = async (res: NextApiResponse, token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "csrf-token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
  });
};

export const verifyCsrfToken = (req: NextApiRequest) => {
  const csrfToken = req.headers["x-csrf-token"] || req.body.csrfToken;
  const cookieToken = req.cookies["csrf-token"];

  if (csrfToken !== cookieToken) {
    throw new Error("Invalid CSRF token");
  }
};
