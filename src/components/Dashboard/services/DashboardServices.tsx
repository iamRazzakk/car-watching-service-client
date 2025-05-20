/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Upload,
} from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
  image?: string;
}

const DashboardServices: React.FC = () => {
  const { data, isLoading } = useGetAllCarServicesQuery(undefined);
  const [deleteCarService] = useDeleteCarServiceMutation();
  const [updateCarService] = useUpdateCarServiceMutation();
  const [createCarService] = useCreateCarServiceMutation();

  // Create modal image file
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Edit modal image file and existing image url
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <LoadingPage />;

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

  const handleEdit = (record: DataType) => {
    setCurrentRecord(record);
    setExistingImageUrl(record.image || "");
    setEditImageFile(null);
    editForm.setFieldsValue({
      name: record.name,
      duration: record.duration,
      price: record.price,
      description: record.description,
    });
    setEditModalVisible(true);
  };

  // ImgBB upload helper function
  const uploadToImgBB = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64data = (reader.result as string).split(",")[1];
          const formData = new FormData();
          formData.append("key", "4de15ac53abd01fd9836fb7fce960655"); // Your ImgBB API key
          formData.append("image", base64data);

          const res = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          if (data.success) {
            resolve(data.data.url);
          } else {
            reject(new Error("ImgBB upload failed"));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleCreateSubmit = async (values: any) => {
    try {
      if (!imageFile) {
        toast.error("Please upload an image.");
        return;
      }

      setIsSubmitting(true);

      const imageUrl = await uploadToImgBB(imageFile);

      await createCarService({ ...values, image: imageUrl }).unwrap();

      toast.success("Service created successfully");
      setCreateModalVisible(false);
      createForm.resetFields();
      setImageFile(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create service";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (values: any) => {
    if (currentRecord) {
      try {
        setIsSubmitting(true);

        let imageUrl = existingImageUrl;

        if (editImageFile) {
          imageUrl = await uploadToImgBB(editImageFile);
        }

        await updateCarService({
          id: currentRecord.key,
          ...values,
          image: imageUrl,
        }).unwrap();

        toast.success("Service updated successfully");
        setEditModalVisible(false);
        editForm.resetFields();
        setEditImageFile(null);
        setExistingImageUrl("");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to update service";
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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

  const myData: DataType[] =
    data?.data
      .filter((item: any) => !item.isDeleted)
      .map((item: any) => ({
        key: item._id,
        name: item.name,
        duration: item.duration,
        price: item.price,
        description: item.description,
        createdAt: item.createdAt,
        image: item.image,
      })) || [];

  return (
    <div>
      <h2 className="lg:text-4xl md:text-2xl text-xl font-bold text-center lg:mb-8 md:mb-6 mb-4">
        All Services
      </h2>
      <div className="lg:flex items-end justify-end lg:mb-8 md:mb-6 mb-4">
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>
          Add New Service
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={myData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />

      {/* Create Modal */}
      <Modal
        title="Add New Service"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <Form form={createForm} layout="vertical" onFinish={handleCreateSubmit}>
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
          <Form.Item
            label="Image"
            required
            rules={[
              {
                validator: () =>
                  imageFile
                    ? Promise.resolve()
                    : Promise.reject("Please upload an image"),
              },
            ]}
          >
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                setImageFile(file);
                return false;
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Service"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateSubmit}>
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

          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                setEditImageFile(file);
                return false;
              }}
            >
              {editImageFile ? (
                <img
                  src={URL.createObjectURL(editImageFile)}
                  alt="new"
                  style={{ width: "100%" }}
                />
              ) : existingImageUrl ? (
                <img
                  src={existingImageUrl}
                  alt="current"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardServices;
