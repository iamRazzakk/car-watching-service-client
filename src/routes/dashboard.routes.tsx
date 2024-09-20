import { Outlet } from "react-router-dom";
import DashboardServices from "../components/Dashboard/services/DashboardServices";
import CreateSlot from "../components/Dashboard/Slot/CreateSlot";
import ViewAllSlote from "../components/Dashboard/Slot/ViewAllSlote";
import UserManagement from "../components/Dashboard/userManagement/UserManagement";
import ViewUserBookings from "../components/Dashboard/userManagement/ViewUserBookings";
import User from "../components/Dashboard/User";
import { PrivateRoute } from "./PrivateRoute";

export const dashboardRouter = [
  {
    path: "me",
    element: <User />,
  },
  {
    path: "services",
    element: (
      <PrivateRoute allowedRoles={["ADMIN"]}>
        <DashboardServices />
      </PrivateRoute>
    ),
  },
  {
    path: "slot",
    element: (
      <PrivateRoute allowedRoles={["ADMIN"]}>
        <div>
          <Outlet />
        </div>
      </PrivateRoute>
    ),
    children: [
      {
        path: "create",
        element: <CreateSlot />,
      },
      {
        path: "view",
        element: <ViewAllSlote />,
      },
    ],
  },
  {
    path: "user",
    element: (
      <PrivateRoute allowedRoles={["ADMIN"]}>
        <div>
          <Outlet />
        </div>
      </PrivateRoute>
    ),
    children: [
      {
        path: "booking-create",
        element: <ViewUserBookings />,
      },
      {
        path: "booking",
        element: <ViewUserBookings />,
      },
      {
        path: "role",
        element: <UserManagement />,
      },
    ],
  },
];
