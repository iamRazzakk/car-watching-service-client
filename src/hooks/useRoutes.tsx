// routes/userRouter.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import { MainRoutes } from "../routes/main.routes";
import { AuthRouter } from "../routes/auth.routes";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashBoardLayout from "../layouts/DashBoardLayout";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authslice";
import { dashboardRouter } from "../routes/dashboard.routes";
import { userRouter } from "../routes/user.routes";

export const useRouter = () => {
  const user = useAppSelector(useCurrentUser);

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
      children: user?.role === "ADMIN" ? dashboardRouter : userRouter,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
};
