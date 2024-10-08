import PastBookings from "../components/Dashboard/ForUser/PastBookings";
import UpcomingBookings from "../components/Dashboard/ForUser/UpcomingBookings";
import User from "../components/Dashboard/User";

export const userRouter = [
    {
      path: "me",
      element: <User />,
    },
    {
      path: 'past-bookings',
      element: <PastBookings />,
    },
    {
      path: 'upcoming-bookings',
      element: <UpcomingBookings />,
    },
  ];