import AboutUs from "../pages/AboutUs/AboutUs";
import ServiceBooking from "../pages/Booking/ServiceBooking";
import ContactUs from "../pages/ContactUs/ContactUs";
import Home from "../pages/Home";
import ServiceDetailPage from "../pages/ServicePage/ServiceDetailPage";
import ServicePage from "../pages/ServicePage/ServicePage";

export const MainRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "about-us",
    element: <AboutUs />,
  },
  {
    path: "contact-us",
    element: <ContactUs />,
  },
  {
    path: "services",
    element: <ServicePage />,
  },
  {
    path:"/services/:id",
    element:<ServiceDetailPage />
  },
  {
    path:'booking',
    element:<ServiceBooking/>
  }
];
