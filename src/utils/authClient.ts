// utils/authClient.ts
// import Cookies from "js-cookie";

export const setToken = (token: string) => {
  document.cookie = `token=${token}; path=/; Secure; HttpOnly; SameSite=Strict`;
};

export const getToken = (): string | undefined => {
  const token = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("token="));
  return token ? token.split("=")[1] : undefined;
};

export const removeToken = () => {
  document.cookie =
    "token=; Max-Age=0; path=/; Secure; HttpOnly; SameSite=Strict";
};
