import { baseApi } from "../baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCarService: builder.mutation({
      query: (serviceData) => ({
        method: "POST",
        url: "/services",
        body: serviceData,
      }),
      // Invalidate the list tag when creating a new service
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),

    getCarServiceById: builder.query({
      query: (id) => `/services/${id}`,
      // Provides a tag for this specific service
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),

    getAllCarServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      // Provides a tag for the list of services
      providesTags: [{ type: "Service", id: "LIST" }],
    }),

    updateCarService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        method: "PUT",
        url: `/services/${id}`,
        body: serviceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Service", id },
        { type: "Service", id: "LIST" },
      ],
    }),

    deleteCarService: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/services/${id}`,
      }),
      // Invalidate the list tag when deleting a service
      invalidatesTags: [{ type: "Service", id: "LIST" }],
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
