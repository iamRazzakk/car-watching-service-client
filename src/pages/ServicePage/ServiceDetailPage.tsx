import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const dispatch = useDispatch();

  // Fetching service details
  const { data: service, isLoading: serviceLoading } = useGetCarServiceByIdQuery(id);

  // Fetching available slots for the selected service and date
  const { data: slots, isLoading: slotsLoading } = useGetAllSlotsQuery({
    serviceId: id,
    date: selectedDate.format("YYYY-MM-DD"),
  });

  const serviceList = service?.data;
  const sloteList = slots?.data;

  if (serviceLoading || slotsLoading) return <LoadingPage />;

  // Handle Slot Selection and automatic booking
  const handleSlotSelect = (slot: any) => {
    const serviceBookingData = {
      serviceId: serviceList._id,
      slotId: slot._id,
      serviceName: serviceList.name,
      serviceImage: serviceList.img || "",
      duration: serviceList.duration,
      price: serviceList.price,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };

    // Dispatch the action to add the booking
    dispatch(addBookmark(serviceBookingData));
    toast.success("Bookmark Successfully")
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <NavigationButtons />
      {serviceList ? (
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden lg:mt-8 md:mt-4">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src={serviceList?.imageUrl}
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
                    <span className="font-semibold">Price:</span> {serviceList?.price}
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500 rounded-full py-2 px-4 text-white shadow-md">
                  <FaClock className="text-xl" />
                  <div className="text-xl">
                    <span className="font-semibold">Duration:</span> {serviceList?.duration}
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
                <h3 className="font-semibold text-xl mb-2">Available Time Slots:</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {sloteList?.map((slot: any) => (
                    <button
                      key={slot._id}
                      onClick={() => handleSlotSelect(slot)}
                      className={`py-2 px-4 rounded-lg shadow-md transition-colors ${
                        slot.isBooked === "booked" ? "bg-gray-300" : "bg-blue-500 text-white"
                      } hover:bg-blue-600`}
                      disabled={slot.isBooked === "booked"}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))}
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
