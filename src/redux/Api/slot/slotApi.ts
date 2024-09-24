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
      query: ({ serviceId, date }) => ({
        url: "/slots/availability",
        params: { serviceId, date },
      }),
      providesTags: ["SlotList"],
    }),
    getSingleSlot: builder.query({
      query: (id) => ({
        url: `/services/slots/${id}`,
        method: "GET",
      }),
      providesTags: ["SlotList"],
    }),
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
