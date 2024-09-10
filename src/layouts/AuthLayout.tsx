import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavigationButtons from "../shared/NavigationButtons/NavigationButtons";

type TAuthProps = object;

const AuthLayout: FC<TAuthProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <NavigationButtons />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
