// src/redux/features/booking/bookingServiceApi.ts
import { baseApi } from "../baseApi";

// Define the bookingServiceApi with endpoints
const bookingServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to get all user bookings
    getUserBookings: builder.query({
      query: () => 'bookings',
    }),
    // Endpoint to create a booking
    createBooking: builder.mutation({
      query: (payload) => ({
        url: 'bookings',
        method: 'POST',
        body: payload,
      }),
    }),
    // Endpoint to get all bookings (for admin)
    // getAllBookings: builder.query({
    //   query: () => 'bookings',
    // }),
  }),
  // Provide tags for invalidation and refetching
  overrideExisting: false,
});

// Export hooks for the endpoints
export const {
  useGetUserBookingsQuery,
  useCreateBookingMutation,
//   useGetAllBookingsQuery,
} = bookingServiceApi;

export default bookingServiceApi;
