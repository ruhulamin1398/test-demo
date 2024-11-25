import { appConfig } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.api}`,
    // baseUrl: `https://api.lottaverse.io`,
  }),
  tagTypes: ["user", "lottery"],
  endpoints: () => ({}),
});
