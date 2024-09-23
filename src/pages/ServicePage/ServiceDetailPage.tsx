import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetCarServiceByIdQuery } from "../../redux/Api/services/serviceApi";
import LoadingPage from "../Loading/LoadingPage";
import { FaDollarSign, FaClock } from "react-icons/fa";
import NavigationButtons from "../../shared/NavigationButtons/NavigationButtons";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { useGetAllSlotsQuery } from "../../redux/Api/slot/slotApi";
import { addBookmark } from "../../redux/features/auth/bookingSlice";
import { toast } from "sonner";

interface Image {
  url: string; 
  altText: string;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  image?: Image;
}

interface Slot {
  _id: string;
  service: Service;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: "booked" | "";
}


const ServiceDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Moment>(moment()); 
  const dispatch = useDispatch();

  // Fetching service details
  const { data: serviceData, isLoading: serviceLoading } =
    useGetCarServiceByIdQuery(id);
  const serviceList = serviceData?.data as Service; 

  // Fetching available slots for the selected service and date
  const { data: slotsData, isLoading: slotsLoading } = useGetAllSlotsQuery({
    serviceId: id,
    date: selectedDate.format("YYYY-MM-DD"), 
  });
  const sloteList = slotsData?.data as Slot[]; 

  // Handle Slot Selection and automatic booking
  const handleSlotSelect = (slot: Slot) => {
    const serviceBookingData = {
      serviceId: serviceList._id,
      slotId: slot._id,
      serviceName: serviceList.name,
      serviceImage: serviceList.image?.url || "",
      duration: serviceList.duration,
      price: serviceList.price,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };
    console.log(serviceBookingData);

    // Dispatch the action to add the booking
    dispatch(addBookmark(serviceBookingData));
    navigate("/booking", { state: { bookingData: serviceBookingData } });
    toast.success("Bookmark Successfully");
  };

  if (serviceLoading || slotsLoading) return <LoadingPage />;

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <NavigationButtons />
      {serviceList ? (
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden lg:mt-8 md:mt-4">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
               src={serviceList?.image?.url}
               alt={serviceList?.image?.altText || "Service Image"}
              className="w-full h-80 object-cover"
            />
          </div>
          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="lg:text-3xl text-xl font-bold mb-4">{serviceList?.name}</h1>
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
              {/* Ant Design DatePicker */}
              <div className="my-4">
                <h3 className="font-semibold text-xl mb-2">Select a Date:</h3>
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date as Moment)}
                  format="YYYY-MM-DD"
                  className="p-2 border rounded-md"
                />
              </div>
              {/* Slot Selection Section */}
              <div className="my-4">
                <h3 className="font-semibold text-xl mb-2">
                  Available Time Slots:
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {sloteList
                    ?.filter(
                      (slot: Slot) =>
                        slot.service._id === serviceList._id &&
                        slot.isBooked !== "booked"
                    ) // Filter by service ID and availability
                    .map((slot: Slot) => (
                      <button
                        key={slot._id}
                        onClick={() => handleSlotSelect(slot)}
                        className="py-2 px-4 rounded-lg shadow-md bg-blue-500 text-white transition-colors hover:bg-blue-600"
                      >
                        {slot.startTime} - {slot.endTime}
                      </button>
                    ))}
                  {/* Message when no available slots */}
                  {sloteList?.filter(
                    (slot: Slot) =>
                      slot.service._id === serviceList._id &&
                      slot.isBooked !== "booked"
                  ).length === 0 && (
                    <div className="lg:text-2xl text-xl font-bold text-center">No available slots for this date.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No service found</div>
      )}
    </div>
  );
};

export default ServiceDetailPage;
