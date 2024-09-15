import { Form, Button, DatePicker, TimePicker, Select } from "antd";
import {
  useCreateSlotMutation,
  useGetAllSlotsQuery,
} from "../../../redux/Api/slot/slotApi";
import { toast } from "sonner";
import LoadingPage from "../../../pages/Loading/LoadingPage";

const { Option } = Select;

const CreateSlot: React.FC = () => {
  const [createSlot, { isLoading }] = useCreateSlotMutation();
  const {
    data,
    isLoading: slotsLoading,
  } = useGetAllSlotsQuery();
  const [form] = Form.useForm();

  // Extract slots data
  const slots = data?.data || [];

  const onFinish = async (values: any) => {
    try {
      await createSlot({
        service: values.service,
        date: values.date.format("YYYY-MM-DD"),
        startTime: values.startTime.format("HH:mm"),
        endTime: values.endTime.format("HH:mm"),
      }).unwrap();
      toast.success("Slot created successfully");
      form.resetFields();
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
    }
  };

  if (slotsLoading) return <LoadingPage />;

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
          <div className="w-full">
            <Select className="w-full" placeholder="Select a service">
              {slots.map((slot: any) => (
                <Option key={slot._id} value={slot.service._id}>
                  {slot.service.name}
                </Option>
              ))}
            </Select>
          </div>
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <div className="w-full">
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </div>
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: "Please select a start time" }]}
        >
          <div className="w-full">
            <TimePicker className="w-full" format="HH:mm" />
          </div>
        </Form.Item>

        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: "Please select an end time" }]}
        >
          <div className="w-full">
            <TimePicker className="w-full" format="HH:mm" />
          </div>
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