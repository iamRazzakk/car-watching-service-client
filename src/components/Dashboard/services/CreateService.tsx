import { useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCreateCarServiceMutation } from "../../../redux/Api/services/serviceApi";

const CreateService = ({ onServiceCreated }: { onServiceCreated: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createCarService] = useCreateCarServiceMutation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      duration: 0,
    },
  });

  // Handle form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      await createCarService(data).unwrap();
      console.log(data);
      onServiceCreated(); 
      // Notify parent component to refetch data
      handleClose();
      reset();
    } catch (error) {
      console.error('Failed to create service:', error);
    }
  };

  // Handle modal open
  const handleOpen = () => {
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <Button type="primary" onClick={handleOpen}>
        Add New Service
      </Button>

      {/* Modal for creating a new service */}
      <Modal
        title="Add New Service"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Name */}
          <Form.Item label="Service Name" name="name" rules={[{ required: true }]}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input.TextArea {...field} />}
            />
          </Form.Item>

          {/* Price */}
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => <InputNumber {...field} min={0} />}
            />
          </Form.Item>

          {/* Duration */}
          <Form.Item label="Duration (minutes)" name="duration" rules={[{ required: true }]}>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => <InputNumber {...field} min={0} />}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateService;
