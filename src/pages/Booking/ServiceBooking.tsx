import { Input, Form, Button } from "antd";
import { FaDollarSign, FaClock } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useState } from "react";

const ServiceBooking = () => {
  const dispatch = useAppDispatch();
  const selectedService = useAppSelector((state) => state.booking.selectedService);
  const selectedSlot = useAppSelector((state) => state.booking.selectedSlot);
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);

  console.log("selectedSlot from Redux store:", selectedSlot);

  const handlePayment = () => {
    setIsLoading(true);
    console.log("Proceed to payment");
    setTimeout(() => setIsLoading(false), 2000); // Simulate payment process
  };

  return (
    <div className="container mx-auto p-8 lg:p-12 flex flex-col lg:flex-row gap-8">
      {/* Left Side: Cart Summary */}
      <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        <h2 className="text-3xl font-bold mb-4 border-b border-gray-200 pb-2">
          Booking Cart
        </h2>
        {selectedService ? (
          <div className="flex flex-col space-y-4">
            <img
              src={selectedService.imageUrl || ""}
              alt="Service Image"
              className="w-full h-60 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-2">
              {selectedService.name}
            </h3>
            <p className="text-lg mb-2">{selectedService.description}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2 bg-blue-500 rounded-full py-2 px-4 text-white shadow-md">
                <FaDollarSign className="text-xl" />
                <span className="text-xl font-semibold">
                  {selectedService.price}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500 rounded-full py-2 px-4 text-white shadow-md">
                <FaClock className="text-xl" />
                <span className="text-xl font-semibold">
                  {selectedService.duration}
                </span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="text-xl font-semibold mb-2">Selected Time Slot</h4>
              {selectedSlot ? (
                <p>
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </p>
              ) : (
                <p>No slot selected</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No service selected</div>
        )}
      </div>

      {/* Right Side: Booking Form */}
      <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        <h2 className="text-3xl font-bold mb-4 border-b border-gray-200 pb-2">
          Booking Details
        </h2>
        {user ? (
          <Form layout="vertical">
            <Form.Item label="Name" name="name" initialValue={user.name}>
              <Input disabled />
            </Form.Item>
            <Form.Item label="Email" name="email" initialValue={user.email}>
              <Input disabled />
            </Form.Item>
            <Form.Item className="mt-6">
              <Button
                type="primary"
                onClick={handlePayment}
                loading={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Confirm Booking"}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="text-center text-gray-500">
            Please log in to complete your booking.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceBooking;
