import React from "react";
import { useParams } from "react-router-dom";
import { useGetCarServiceByIdQuery } from "../../redux/features/services/serviceApi";
import LoadingPage from "../Loading/LoadingPage";
import { FaDollarSign, FaClock } from "react-icons/fa";
import Button from "../../shared/Button/Button";

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: service,
    isLoading
  } = useGetCarServiceByIdQuery(id);
//   console.log(service.data);
  const serviceList = service?.data
  console.log(serviceList);
  if (isLoading) return <LoadingPage />;

  return (
    <div className="container mx-auto p-4 lg:p-8">
      {service ? (
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src={
                serviceList?.imageUrl ||
                ""
              }
              alt="Service Image"
              className="w-full h-80 object-cover"
            />
          </div>
          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{serviceList?.name}</h1>
              <p className="text-gray-700 mb-4">{serviceList?.description}</p>
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center space-x-2 bg-blue-500 rounded-full py-2 px-4 text-white shadow-md">
                  <FaDollarSign className="text-xl" />
                  <div className="text-xl">
                    <span className="font-semibold">Price:</span>{" "}
                    {serviceList?.price}
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500 rounded-full py-2 px-4 text-white shadow-md">
                  <FaClock className="text-xl" />
                  <div className="text-xl">
                    <span className="font-semibold">Duration:</span>{" "}
                    {serviceList?.duration}
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() =>
                console.log("Book Now clicked for service:", service)
              }
              category="primary"
              text="Book Now"
              type="button"
              className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            />
          </div>
        </div>
      ) : (
        <div>No service found</div>
      )}
    </div>
  );
};

export default ServiceDetailPage;
