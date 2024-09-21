import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getAllSlotBooking } from "../../redux/features/auth/bookingSlice";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { useCurrentUser } from "../../redux/features/auth/authslice";
import { Form, Input, Button, InputNumber, Row, Col, Card, Select } from "antd";
import NavigationButtons from "../../shared/NavigationButtons/NavigationButtons";
import { useMakePaymentMutation } from "../../redux/Api/paymentApi/paymentApi";

// Vehicle types array
export const vehicleTypeArray = [
  "car",
  "truck",
  "SUV",
  "van",
  "motorcycle",
  "bus",
  "electricVehicle",
  "hybridVehicle",
  "bicycle",
  "tractor",
] as const;

const ServiceBooking: React.FC = () => {
  const allBookings = useAppSelector(getAllSlotBooking);
  const currentUser = useAppSelector(useCurrentUser);

  const [makePayment, { isLoading, isSuccess, isError }] =
    useMakePaymentMutation();

  const [userData, setUserData] = useState({
    userName: currentUser?.name,
    email: currentUser?.email,
    address: currentUser?.address,
    phone: currentUser?.phone,
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
    manufacturingYear: undefined,
    registrationPlate: "",
  });
  
  console.log("User Data:", userData);
  const selectedBooking = allBookings[0];

  if (!selectedBooking) {
    console.log("No booking found.");
    return <div>No booking found.</div>;
  }

  const handleSubmit = async (values: any) => {
    const formData = {
      user: {
        name: values.userName,
        email: values.email,
        phone: currentUser?.phone,
        address: currentUser?.address,
      },
      vehicleDetails: {
        vehicleType: values.vehicleType,
        vehicleBrand: values.vehicleBrand,
        vehicleModel: values.vehicleModel,
        manufacturingYear: parseInt(values.manufacturingYear, 10),
        registrationPlate: values.registrationPlate,
      },
      serviceDetails: {
        serviceId: selectedBooking._id,
        serviceName: selectedBooking.serviceName,
        startTime: selectedBooking.startTime,
        endTime: selectedBooking.endTime,
        duration: selectedBooking.duration,
        price: selectedBooking.price,
      },
      totalPrice: selectedBooking.price,
      userId: currentUser?._id,
    };
  
    console.log("Submitting Payment with Form Data:", formData); 
  
    try {
      const paymentResponse = await makePayment(formData).unwrap();
      console.log("Payment successful:", paymentResponse);
    } catch (error) {
      console.error("Payment failed:", error.data.message);
    }
  };
  

  return (
    <div className="p-4">
      <NavigationButtons />
      <Row gutter={16} className="lg:mt-8 md:mt-6 mt-4">
        {/* Left Side: Service & Slot Details */}
        <Col xs={24} lg={12}>
          <Card
            cover={
              <img
                src={selectedBooking.serviceImage}
                alt={selectedBooking.serviceName}
                style={{ objectFit: "cover", height: 300 }}
              />
            }
          >
            <Card.Meta
              title={selectedBooking.serviceName}
              description={
                <>
                  <div className="flex items-center">
                    <FaDollarSign className="text-lg mr-2" />
                    <span>Price: ${selectedBooking.price}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <FaClock className="text-lg mr-2" />
                    <span>Duration: {selectedBooking.duration} min</span>
                  </div>
                  <div className="mt-4">
                    <strong>Selected Time:</strong> {selectedBooking.startTime}{" "}
                    - {selectedBooking.endTime}
                  </div>
                </>
              }
            />
          </Card>
        </Col>

        {/* Right Side: User Info & Payment Form */}
        <Col xs={24} lg={12}>
          <Card>
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <Form
              layout="vertical"
              initialValues={userData}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="User Name"
                name="userName"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Vehicle Type"
                name="vehicleType"
                rules={[{ required: true, message: "Please select a vehicle type" }]}
              >
                <Select placeholder="Select vehicle type" allowClear>
                  {vehicleTypeArray.map((type) => (
                    <Select.Option key={type} value={type}>
                      {type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Vehicle Brand"
                name="vehicleBrand"
                rules={[{ required: true, message: "Please enter vehicle brand" }]}
              >
                <Input placeholder="Enter vehicle brand" />
              </Form.Item>

              <Form.Item
                label="Vehicle Model"
                name="vehicleModel"
                rules={[{ required: true, message: "Please enter vehicle model" }]}
              >
                <Input placeholder="Enter vehicle model" />
              </Form.Item>

              <Form.Item
                label="Manufacturing Year"
                name="manufacturingYear"
                rules={[{ required: true, message: "Please enter manufacturing year" }]}
              >
                <InputNumber
                  placeholder="Enter year"
                  min={1900}
                  max={new Date().getFullYear()}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Registration Plate"
                name="registrationPlate"
                rules={[{ required: true, message: "Please enter registration plate" }]}
              >
                <Input placeholder="Enter registration plate" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                >
                  {isLoading ? "Processing..." : "Pay Now"}
                </Button>
              </Form.Item>

              {isError && <div style={{ color: "red" }}>Payment failed</div>}
              {isSuccess && <div style={{ color: "green" }}>Payment successful</div>}
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ServiceBooking;
