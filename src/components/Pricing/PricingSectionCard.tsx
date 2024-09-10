import React from "react";
import {  FaCalendarDay } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import Button from "../../shared/Button/Button";
import { MdLocalCarWash } from "react-icons/md";

interface ServiceCardProps {
  serviceName: string;
  description: string;
  price: string;
  duration: string;
}
const handleButtonClick = (buttonType: string) => {
  console.log(`${buttonType} button clicked`);
};
const PricingSectionCard: React.FC<ServiceCardProps> = ({
  serviceName,
  description,
  price,
  duration,
}) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-sm w-full h-80 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <MdLocalCarWash className="text-blue-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold">{serviceName}</h3>
          </div>
          <p className="text-gray-700 mb-4 flex-grow">{description}</p>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center">
              <CiClock1 className="text-gray-500 mr-2" />
              <span className="text-gray-600">{duration}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarDay className="text-gray-500 mr-2" />
              <span className="text-gray-600">{price}</span>
            </div>
          </div>
        </div>
        <div className="p-5  border-t border-gray-200 mx-auto">
          <Button
            text="Book Now"
            type="primary"
            onClick={() => handleButtonClick("primary")}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSectionCard;
