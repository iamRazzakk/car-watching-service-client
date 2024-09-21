import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments", 
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useMakePaymentMutation } = paymentApi;

export default paymentApi;
