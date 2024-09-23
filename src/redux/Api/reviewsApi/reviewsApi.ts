import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
      }),
    }),
    getAllReview: builder.query({
      query: (reviewData) => ({
        url: "/review",
        method: "GET",
        body: reviewData,
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewQuery } = reviewApi;

export default reviewApi;
