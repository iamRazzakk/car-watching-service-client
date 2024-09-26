import { baseApi } from "../baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCarService: builder.mutation({
      query: (serviceData) => ({
        method: "POST",
        url: "/services",
        body: serviceData,
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),

    getCarServiceById: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Service", id }],

    }),

    getAllCarServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: [{ type: "Service", id: "LIST" }],
    }),

    updateCarService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        method: "PUT",
        url: `/services/${id}`,
        body: serviceData,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Service", id },
        { type: "Service", id: "LIST" },
      ],
    }),

    deleteCarService: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/services/${id}`,
      }),
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
