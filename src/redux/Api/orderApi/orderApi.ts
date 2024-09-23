import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
  }),
});

export const {
   useGetAllOrdersQuery
  } = orderApi;
  
  export default orderApi;