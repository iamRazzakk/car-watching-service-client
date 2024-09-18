import { useState } from "react";
import {
  Button,
  Table,
  Tooltip,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import type { TableProps } from "antd";
import {
  useDeleteCarServiceMutation,
  useGetAllCarServicesQuery,
  useUpdateCarServiceMutation,
  useCreateCarServiceMutation,
} from "../../../redux/Api/services/serviceApi";
import LoadingPage from "../../../pages/Loading/LoadingPage";
import { toast } from "sonner";

interface DataType {
  key: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  createdAt: string;
}

const DashboardServices: React.FC = () => {
  const { data, isLoading } = useGetAllCarServicesQuery(undefined);
  const [deleteCarService] = useDeleteCarServiceMutation();
  const [updateCarService] = useUpdateCarServiceMutation();
  const [createCarService] = useCreateCarServiceMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [isCreating, setIsCreating] = useState(false);

  // Handle loading state
  if (isLoading) return <LoadingPage />;

  // Handle delete action
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this service?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteCarService(id).unwrap();
          toast.success("Service deleted successfully");
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to delete service";
          toast.error(errorMessage);
        }
      },
    });
  };

  // Handle edit action
  const handleEdit = (record: DataType) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      name: record.name,
      duration: record.duration,
      price: record.price,
      description: record.description,
    });
    setModalVisible(true);
  };

  // Handle form submission for update
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    if (currentRecord) {
      try {
        await updateCarService({ id: currentRecord.key, ...values }).unwrap();
        toast.success("Service updated successfully");
        setModalVisible(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to update service";
        toast.error(errorMessage);
      }
    }
  };

  // Handle form submission for create
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    try {
      await createCarService(values).unwrap();
      toast.success("Service created successfully");
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create service";
      toast.error(errorMessage);
    }
  };

  // Define table columns
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Duration (min)",
      dataIndex: "duration",
      key: "duration",
      render: (text) => (
        <Tooltip title={text}>
          <p className="description-text">
            {text.toString().length > 50
              ? `${text.toString().slice(0, 50)}...`
              : text}
          </p>
        </Tooltip>
      ),
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Transform fetched data to fit DataType format
  const myData: DataType[] =
    data?.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((item: any) => !item.isDeleted)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        key: item._id,
        name: item.name,
        duration: item.duration,
        price: item.price,
        description: item.description,
        createdAt: item.createdAt,
      })) || [];

  return (
    <div>
      <h2 className="lg:text-4xl md:text-2xl text-xl font-bold text-center lg:mb-8 md:mb-6 mb-4">
        All Services
      </h2>
      <div className="lg:flex items-end justify-end lg:mb-8 md:mb-6 mb-4">
        <Button
          type="primary"
          onClick={() => {
            setIsCreating(true);
            setModalVisible(true);
          }}
        >
          Add New Service
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={myData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Service"
        visible={modalVisible && !isCreating}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          className=""
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the service name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item
              label="Duration (min)"
              name="duration"
              rules={[
                { required: true, message: "Please enter the duration!" },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              label="Price ($)"
              name="price"
              rules={[{ required: true, message: "Please enter the price!" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea style={{ height: 120, resize: "none" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Add New Service"
        visible={modalVisible && isCreating}
        onCancel={() => {
          setModalVisible(false);
          setIsCreating(false);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the service name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Duration (min)"
            name="duration"
            rules={[{ required: true, message: "Please enter the duration!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea style={{ height: 120, resize: "none" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardServices;
