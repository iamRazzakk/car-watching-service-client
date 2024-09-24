import { useAppSelector } from "../../redux/hooks";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { useCurrentUser } from "../../redux/features/auth/authslice";
import { Form, Input, Button, InputNumber, Row, Col, Card, Select } from "antd";
import NavigationButtons from "../../shared/NavigationButtons/NavigationButtons";
import { useMakePaymentMutation } from "../../redux/Api/paymentApi/paymentApi";
import { toast } from "sonner";
import { getSlotBookmark } from "../../redux/features/auth/bookingSlice";

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
  const myBooking = useAppSelector(getSlotBookmark);
  const currentUser = useAppSelector(useCurrentUser);
  const [makePayment, { isLoading }] = useMakePaymentMutation();
  const [form] = Form.useForm();
  console.log(myBooking);
  const selectedBooking = myBooking;
  console.log("Selected Booking Date:", selectedBooking.sloteDate);

  if (!selectedBooking) {
    return <div>No booking found.</div>;
  }

  const handleSubmit = async (values: any) => {
    const formData = {
      user: {
        name: currentUser?.name,
        email: currentUser?.email,
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
        serviceId: selectedBooking.serviceId,
        serviceName: selectedBooking.serviceName,
        startTime: values.startTime || selectedBooking.startTime,
        endTime: values.endTime || selectedBooking.endTime,
        duration: values.duration || selectedBooking.duration,
        price: selectedBooking.price,
        date: selectedBooking.sloteDate, // Ensure this is correctly assigned
      },
      totalPrice: selectedBooking.price,
      userId: currentUser?._id,
    };

    console.log("Form Data being sent:", formData.serviceDetails.date); 

    try {
      const paymentResponse = await makePayment(formData).unwrap(); 
      if (paymentResponse.success) {
        window.location.href = paymentResponse.data.payment_url;
      }
      toast.success("Payment successful! Redirecting...");
    } catch (error) {
      console.error("Payment failed:", error.data?.message || error.message); 
      toast.error("Payment failed: " + (error.data?.message || error.message));
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
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="User Name">
                <Input value={currentUser?.name} disabled />
              </Form.Item>

              <Form.Item label="Email">
                <Input value={currentUser?.email} disabled />
              </Form.Item>

              <Form.Item
                label="Vehicle Type"
                name="vehicleType"
                rules={[
                  { required: true, message: "Please select a vehicle type" },
                ]}
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
                rules={[
                  { required: true, message: "Please enter vehicle brand" },
                ]}
              >
                <Input placeholder="Enter vehicle brand" />
              </Form.Item>

              <Form.Item
                label="Vehicle Model"
                name="vehicleModel"
                rules={[
                  { required: true, message: "Please enter vehicle model" },
                ]}
              >
                <Input placeholder="Enter vehicle model" />
              </Form.Item>

              <Form.Item
                label="Manufacturing Year"
                name="manufacturingYear"
                rules={[
                  {
                    required: true,
                    message: "Please enter manufacturing year",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please enter registration plate",
                  },
                ]}
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
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ServiceBooking;
