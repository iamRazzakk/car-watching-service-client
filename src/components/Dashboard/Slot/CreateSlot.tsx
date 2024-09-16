import React from "react";
import { Form, Button, DatePicker, TimePicker, Select } from "antd";
import { useCreateSlotMutation } from "../../../redux/Api/slot/slotApi";
import { toast } from "sonner";
import LoadingPage from "../../../pages/Loading/LoadingPage";
import { useGetAllCarServicesQuery } from "../../../redux/Api/services/serviceApi";

const { Option } = Select;

const CreateSlot: React.FC = () => {
  const [createSlot, { isLoading }] = useCreateSlotMutation();
  const { data, isLoading: servicesLoading } = useGetAllCarServicesQuery();
  const [form] = Form.useForm();

  // Extract services data
  const services = data?.data || [];

  const onFinish = async (values: any) => {
    try {
      // Extract values
      const { service, date, startTime, endTime } = values;

      // Validate end time is after start time
      if (endTime.isBefore(startTime)) {
        toast.error("End time must be after start time");
        return;
      }

      // Call API
      await createSlot({
        service,
        date: date.format("YYYY-MM-DD"),
        startTime: startTime.format("HH:mm"),
        endTime: endTime.format("HH:mm"),
      }).unwrap();
      
      toast.success("Slot created successfully");
      form.resetFields();
    } catch (error: any) {
      // Handle error
      const errorMessage = error?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  if (servicesLoading) return <LoadingPage />;

  return (
    <>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-bold text-center mb-4">Create Slot</h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Form.Item
          name="service"
          label="Service ID"
          rules={[{ required: true, message: "Please select a service" }]}
        >
          <Select className="w-full" placeholder="Select a service">
            {services.map((service: any) => (
              <Option key={service._id} value={service._id}>
                {service.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: "Please select a start time" }]}
        >
          <TimePicker className="w-full" format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: "Please select an end time" }]}
        >
          <TimePicker className="w-full" format="HH:mm" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create Slot
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateSlot;
