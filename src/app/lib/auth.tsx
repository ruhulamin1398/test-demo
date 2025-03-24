import { jwtVerify, SignJWT, decodeJwt, errors as JoseErrors } from "jose"; // Import jose methods
import { cookies } from "next/headers"; // For cookie management
import { IUser } from "@/interfaces"; // Assuming IUser interface is defined elsewhere

const { JWTExpired } = JoseErrors;

// Define constants for token secrets and expiration times
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret";
const ACCESS_TOKEN_EXPIRATION = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRATION = "7d"; // 7 days

// Define interface for JWT Payload
export interface JwtPayload {
  user: IUser;
}

// Type Guard to ensure the payload is of type JwtPayload
const isJwtPayload = (payload: unknown): payload is JwtPayload => {
  return (payload as JwtPayload)?.user !== undefined;
};

// Generate Access Token
export const generateAccessToken = (user: IUser) => {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(ACCESS_TOKEN_EXPIRATION)
    .sign(new TextEncoder().encode(ACCESS_TOKEN_SECRET)); // TextEncoder is supported in Node.js v22
};

// Generate Refresh Token
export const generateRefreshToken = (name: string) => {
  return new SignJWT({ name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(REFRESH_TOKEN_EXPIRATION)
    .sign(new TextEncoder().encode(REFRESH_TOKEN_SECRET)); // TextEncoder is supported in Node.js v22
};

export const deleteTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
};

// Set Refresh Token and Access Token in HTTP-Only Cookie
export const setTokenCookie = async (user: IUser) => {
  const cookieStore = await cookies();
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user.name);
  cookieStore.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  cookieStore.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

// Decode Access Token without verification
export const decodeAccessToken = (token: string) => {
  try {
    return decodeJwt(token) as JwtPayload;
  } catch (err) {
    throw err;
  }
};

// Verify Access Token
export const verifyAccessToken = async (token: string): Promise<JwtPayload> => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(ACCESS_TOKEN_SECRET)
    );

    // Use the type guard to ensure the payload matches JwtPayload
    if (!isJwtPayload(payload)) {
      throw new Error("Invalid token structure: Missing 'user' in payload.");
    }

    return payload; // Now TypeScript knows `payload` is of type JwtPayload
  } catch (err) {
    throw err; // Let errors propagate
  }
};

// Verify Refresh Token
export const verifyRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(REFRESH_TOKEN_SECRET)
    );
    return payload;
  } catch (err) {
    throw err; // Let errors propagate
  }
};

// Function to get user from access token (without throwing errors)
export const getUserFromAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) return null;
  try {
    const { user } = await verifyAccessToken(accessToken);
    return user ? user : null;
  } catch (_err) {
    try {
      const tokenUserPayload = decodeAccessToken(accessToken);
      if (!isJwtPayload(tokenUserPayload)) {
        return null;
      }
      return tokenUserPayload.user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }
};

// Function to verify authentication and refresh tokens
export const verifyAuthenticationWithRefreshToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!accessToken || !refreshToken) {
    throw new Error("Authentication Error: Tokens missing");
  }
  try {
    // Try verifying the access token first
    const { user } = await verifyAccessToken(accessToken);
    return user;
  } catch (err) {
    // Check if the error is a JWT verification error (expired or invalid token)
    if (err instanceof JWTExpired) {
      try {
        await verifyRefreshToken(refreshToken); // This will throw on failure
        const { user } = decodeAccessToken(accessToken);
        return user;
      } catch (refreshError) {
        console.log(
          "verifyAuthenticationWithRefreshToken refreshError:",
          refreshError
        );
        throw refreshError; // If refresh token is also invalid, propagate error
      }
    }
    throw new Error("Unknown error occurred during token verification");
  }
};
