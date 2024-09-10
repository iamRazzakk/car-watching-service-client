import Button from "../../shared/Button/Button";
import { PricingSectionCardProps } from "../../types/pricingCard";
import {
  FaCarCrash,
  FaTachometerAlt,
  FaPaintBrush,
  FaCog,
  FaTools,
} from "react-icons/fa";
const iconMap = {
  "Exterior Wash": FaCarCrash,
  "Interior Cleaning": FaTachometerAlt,
  "Tire Shine": FaPaintBrush,
  "Hand Wash": FaCarCrash,
  "Wax Application": FaPaintBrush,
  "Tire Cleaning": FaTachometerAlt,
  "Windows Clean": FaCog,
  "Interior Detailing": FaTools,
  "Engine Detailing": FaCog,
  "Clay Bar Treatment": FaPaintBrush,
};
const handleButtonClick = (buttonType: string) => {
  console.log(`${buttonType} button clicked`);
};
const PricingSectionCard: React.FC<PricingSectionCardProps> = ({
  serviceName,
  price,
  subcategories = [],
}) => {
  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-md bg-white w-full mx-auto max-w-sm md:max-w-md lg:max-w-lg h-full">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-center md:text-xl">{serviceName}</h3>
        <div className="mt-2 flex justify-center items-center">
          <span className="text-blue-500 font-bold text-lg md:text-xl">{price}</span>
        </div>
        <div className="mt-4 ">
          {subcategories.length > 0 && (
            <ul className="list-disc list-inside ml-4 space-y-2">
              {subcategories.map((sub) => {
                const IconComponent = iconMap[sub.name] || FaCarCrash;
                return (
                  <li key={sub.id} className="flex items-center justify-center">
                    <IconComponent className="text-blue-700 mr-2 text-base md:text-lg" />
                    {sub.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Button
          onClick={() => handleButtonClick(serviceName)}
          text="Book Now"
          category="primary"
          className="py-2 px-4 text-base md:text-lg"
        />
      </div>
    </div>
  );
};

export default PricingSectionCard;
