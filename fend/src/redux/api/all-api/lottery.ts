import { baseApi } from "../baseApi";

const lotteryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (quotationInfo) => ({
        url: "/purchase",
        method: "POST",
        body: quotationInfo,
      }),
      invalidatesTags: ["lottery"],
    }),
    getSingleUserLotteryDetails: builder.query({
      query: ({ address, page, limit }) => ({
        url: `/purchase/${address}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["lottery"],
    }),
    getDrawLotteryDetails: builder.query({
      query: ({ search_ticket, round, lotteryType, page, limit }) => ({
        url: `/get-draw-lottery`,
        method: "GET",
        params: { search_ticket, round, lotteryType, page, limit },
      }),
      providesTags: ["lottery"],
    }),
    getLotteryForBoard: builder.query({
      query: () => ({
        url: `/get-lottery-board`,
        method: "GET",
      }),
      providesTags: ["lottery"],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetSingleUserLotteryDetailsQuery,
  useGetDrawLotteryDetailsQuery,
  useGetLotteryForBoardQuery,
} = lotteryApi;
