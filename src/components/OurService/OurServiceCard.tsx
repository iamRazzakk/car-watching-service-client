import { FaCarCrash } from "react-icons/fa";
import Title from "../../shared/Title/Title";
import { iconMap, Service } from "../../types/ServiceTypes";



const OurServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { name, description, icon } = service;
  const IconComponent = iconMap[icon] || FaCarCrash;

  return (
    <div className="flex items-center justify-center p-4 ">
      <div className="max-w-sm w-full h-48 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col card">
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <IconComponent className="text-blue-700 text-3xl mr-3" />
          </div>
          <div className="text-center space-y-2">
            <Title  text={name} level={3} className="text-xl font-semibold"></Title>
            <p className="text-gray-700 mb-4 flex-grow">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServiceCard;
