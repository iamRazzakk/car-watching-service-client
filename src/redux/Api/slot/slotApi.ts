import { baseApi } from "../baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (slotData) => ({
        method: "POST",
        url: "/services/slots",
        body: slotData,
      }),
      invalidatesTags: ["SlotList"],
    }),
    getAllSlots: builder.query({
      query: (date) => ({
        url: "/slots/availability",
        params: date,
      }),
      providesTags: ["SlotList"],
    }),
    getSingleSlot: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/services/slots/${id}`,
          method: "GET",
        };
      },

      providesTags: ["SlotList"],
    }),

    //http://localhost:5000/api/services/slots/66ef8d71e2e10fac4e1f6e4f
    updateSlotStatus: builder.mutation({
      query: ({ id, status }) => ({
        method: "PUT",
        url: `/services/slots/update-status/${id}`,
        body: { status },
      }),
      invalidatesTags: ["SlotList"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllSlotsQuery,
  useGetSingleSlotQuery,
  useUpdateSlotStatusMutation,
} = slotApi;

export default slotApi;
