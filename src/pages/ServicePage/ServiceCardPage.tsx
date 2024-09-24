import { Skeleton } from "antd"; 
import Button from "../../shared/Button/Button";
import { FaDollarSign, FaClock } from "react-icons/fa";
import { TCreateService } from "../../types/services.type";
import { useNavigate } from "react-router-dom";

const ServiceCardPage = ({ service }: { service: TCreateService }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/services/${service._id}`);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg lg:h-[450px]">
      {/* If the service or image is still loading, display skeleton */}
      {service ? (
        <img
          src=""
          alt="Service Image"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      ) : (
        <Skeleton.Image className="w-full h-48 rounded-t-lg" />
      )}
      <div className="flex-1 p-4 flex flex-col">
        {service ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">{service?.name}</h2>
            <p className="text-gray-700 mb-4 flex-1">{service?.description}</p>
          </>
        ) : (
          <Skeleton active paragraph={{ rows: 2 }} />
        )}
        <div className="flex flex-wrap items-center justify-between space-y-2">
          <div className="flex items-center space-x-2 bg-blue-500 rounded-full py-1 px-2 text-white shadow-md shadow-gray-700">
            <FaDollarSign className="text-white" />
            <p className="text-white">{service?.price}</p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-500 rounded-full py-1 px-2 text-white shadow-md shadow-gray-700">
            <FaClock className="text-white" />
            <p className="text-white">{service?.duration}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Button
          onClick={handleClick}
          category="primary"
          text="View Details"
          type="button"
          className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        />
      </div>
    </div>
  );
};

export default ServiceCardPage;
