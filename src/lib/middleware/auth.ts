// import { IUser } from "@/interfaces";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// const REFRESH_TOKEN_SECRET =
//   process.env.REFRESH_TOKEN_SECRET! || "refresh-token-secret";
// const ACCESS_TOKEN_SECRET =
//   process.env.ACCESS_TOKEN_SECRET! || "access-token-secret";
// const ACCESS_TOKEN_EXPIRATION = "15m"; // 15 minutes
// const REFRESH_TOKEN_EXPIRATION = "7d"; // 7 days

// // Generate Access Token
// export const generateAccessToken = (user: Partial<IUser>) => {
//   return jwt.sign({ ...user }, ACCESS_TOKEN_SECRET, {
//     expiresIn: ACCESS_TOKEN_EXPIRATION,
//   });
// };

// // Generate Refresh Token
// export const generateRefreshToken = (user: Partial<IUser>) => {
//   return jwt.sign(user, REFRESH_TOKEN_SECRET, {
//     expiresIn: REFRESH_TOKEN_EXPIRATION,
//   });
// };

// // Set Refresh Token in HTTP-Only Cookie
// export const setTokenCookie = async (user: IUser) => {
//   const { firstName, lastName, email, phoneNumber } = user;
//   const cookieStore = await cookies();
//   const accessToken = generateAccessToken({
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//   });
//   const refreshToken = generateRefreshToken({
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//   });
//   cookieStore.set({
//     name: "refresh_token",
//     value: refreshToken,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//   });
//   cookieStore.set({
//     name: "raccess_token",
//     value: accessToken,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//   });
// };

// // Verify Access Token
// export const verifyAccessToken = (token: string) => {
//   try {
//     return jwt.verify(token, ACCESS_TOKEN_SECRET) as IUser;
//   } catch (_err) {
//     throw new Error("Invalid Access Token");
//   }
// };

// // Verify Refresh Token
// export const verifyRefreshToken = (token: string) => {
//   try {
//     return jwt.verify(token, REFRESH_TOKEN_SECRET);
//   } catch (_err) {
//     throw new Error("Invalid Refresh Token");
//   }
// };
