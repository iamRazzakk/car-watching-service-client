import AboutUs from "../pages/AboutUs/AboutUs";
import Home from "../pages/Home";

export const MainRoutes = [
    {
        path:'',
        element: <Home />,
    },
    {
        path:'about-us',
        element:<AboutUs />
    }
]