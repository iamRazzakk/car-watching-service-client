import { useGetAllCarServicesQuery } from "../../redux/features/services/serviceApi";
import { TCreateService } from "../../types/services.type";
import LoadingPage from "../Loading/LoadingPage";
import ServiceCardPage from "./ServiceCardPage";

const ServicePage = () => {
  const { data: Services, isLoading } = useGetAllCarServicesQuery();
  console.log(Services);
  if (isLoading) return <LoadingPage />;
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:p-8 p-4 min-h-screen">
      {Services?.data?.map((service: TCreateService) => (
        <ServiceCardPage key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ServicePage;
