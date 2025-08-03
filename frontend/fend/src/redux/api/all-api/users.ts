import { baseApi } from "../baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    getSingleUserDetails: builder.query({
      query: ({ address, page, limit }) => ({
        url: `/user/${address}`,
        method: "GET",
        params: { page, limit, },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,

  useGetSingleUserDetailsQuery,
} = usersApi;
