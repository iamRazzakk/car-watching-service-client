import { baseApi } from "../../Api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCarService: builder.mutation({
      query: (serviceData) => ({
        method: "POST",
        url: "/services",
        body: serviceData,
      }),
    }),

    getCarServiceById: builder.query({
      query: (id) => `/services/${id}`,
    }),

    getAllCarServices: builder.query({
      query: () => "/services",
    }),

    updateCarService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        method: "PUT",
        url: `/services/${id}`,
        body: serviceData,
      }),
    }),

    deleteCarService: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/services/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateCarServiceMutation,
  useGetCarServiceByIdQuery,
  useGetAllCarServicesQuery,
  useUpdateCarServiceMutation,
  useDeleteCarServiceMutation,
} = serviceApi;
export default serviceApi;
