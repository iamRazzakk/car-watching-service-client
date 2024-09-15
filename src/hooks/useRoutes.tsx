import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import { MainRoutes } from "../routes/main.routes";
import { AuthRouter } from "../routes/auth.routes";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashBoardLayout from "../layouts/DashBoardLayout";
import { dashboardRouter } from "../routes/dashboard.routes";
// import DashboardServices from "../components/Dashboard/services/DashboardServices";

export const userRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts />,
      children: MainRoutes,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: AuthRouter,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <DashBoardLayout />,
      children: dashboardRouter,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
};
