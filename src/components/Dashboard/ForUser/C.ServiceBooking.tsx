import React from "react";
import { Form, Input, Button, notification, Select } from "antd";
import { useCreateBookingMutation } from "../../../redux/Api/bookingService/bookingServiceApi";
import { useGetAllCarServicesQuery } from "../../../redux/Api/services/serviceApi";
import { useGetAllSlotsQuery } from "../../../redux/Api/slot/slotApi";

const { Option } = Select;

const CreateBooking: React.FC = () => {
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const { data: services = [], error: servicesError } = useGetAllCarServicesQuery(undefined);
  const { data: slots = [], error: slotsError } = useGetAllSlotsQuery(undefined);

  if (servicesError) {
    console.error('Error fetching services:', servicesError);
  }

  if (slotsError) {
    console.error('Error fetching slots:', slotsError);
  }

  const onFinish = async (values: any) => {
    try {
      await createBooking(values).unwrap();
      notification.success({
        message: "Booking Created",
        description: "Your booking has been created successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Creation Failed",
        description: "There was an error creating the booking. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Booking</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          serviceId: "",
          slotId: "",
          vehicleType: "car",
          vehicleBrand: "",
          vehicleModel: "",
          manufacturingYear: "",
          registrationPlate: "",
        }}
      >
        <Form.Item
          label="Service"
          name="serviceId"
          rules={[{ required: true, message: "Please select a service" }]}
        >
          <Select placeholder="Select a service">
            {Array.isArray(services) ? (
              services.map((service: any) => (
                <Option key={service._id} value={service._id}>
                  {service.name}
                </Option>
              ))
            ) : (
              <Option disabled>No services available</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Slot"
          name="slotId"
          rules={[{ required: true, message: "Please select a slot" }]}
        >
          <Select placeholder="Select a slot">
            {Array.isArray(slots) ? (
              slots.map((slot: any) => (
                <Option key={slot._id} value={slot._id}>
                  {slot.startTime} - {slot.endTime}
                </Option>
              ))
            ) : (
              <Option disabled>No slots available</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Vehicle Type"
          name="vehicleType"
          rules={[{ required: true, message: "Please enter the vehicle type" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Vehicle Brand"
          name="vehicleBrand"
          rules={[{ required: true, message: "Please enter the vehicle brand" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Vehicle Model"
          name="vehicleModel"
          rules={[{ required: true, message: "Please enter the vehicle model" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Manufacturing Year"
          name="manufacturingYear"
          rules={[{ required: true, message: "Please enter the manufacturing year" }]}
        >
          <Input type="number" min={1900} max={new Date().getFullYear()} />
        </Form.Item>

        <Form.Item
          label="Registration Plate"
          name="registrationPlate"
          rules={[{ required: true, message: "Please enter the registration plate" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create Booking
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBooking;
