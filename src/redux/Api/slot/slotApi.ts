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
      query: () => "/slots/availability",
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
  useUpdateSlotStatusMutation,
} = slotApi;

export default slotApi;
