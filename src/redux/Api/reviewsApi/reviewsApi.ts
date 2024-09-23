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
  }),
});

export const { useCreateReviewMutation } = reviewApi;

export default reviewApi;
