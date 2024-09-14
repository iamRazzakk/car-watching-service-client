import { useDispatch, useSelector } from "react-redux";
import { useGetAllCarServicesQuery } from "../../redux/Api/services/serviceApi";
import LoadingPage from "../Loading/LoadingPage";
import ServiceCardPage from "./ServiceCardPage";
import { useEffect } from "react";
import { setServices } from "../../redux/features/auth/serviceSlice";
import { RootState } from "../../redux/store";
import FilterSearchComponent from "./FilterSearchComponent";
import Title from "../../shared/Title/Title";

const ServicePage = () => {
  const dispatch = useDispatch();
  const { filteredServices } = useSelector(
    (state: RootState) => state.services
  );
  const { data, isLoading } = useGetAllCarServicesQuery();

  // Set services in Redux store when data is fetched
  useEffect(() => {
    if (data?.data) {
      dispatch(setServices(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <div className="lg:p-8 p-4">
        <Title
          text="Car Wash All Services"
          level={1}
          className="text-3xl font-bold text-center"
        />
        <FilterSearchComponent />
        
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:p-8 p-4 min-h-screen">
        {filteredServices?.map((service) => (
          <ServiceCardPage key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
