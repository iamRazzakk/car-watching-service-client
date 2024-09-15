import React from "react";
import { Button, Table, Tooltip, Space, Modal } from "antd";
import type { TableProps } from "antd";
import { useDeleteCarServiceMutation, useGetAllCarServicesQuery } from "../../../redux/Api/services/serviceApi";
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
  const { data, isLoading,refetch } = useGetAllCarServicesQuery();
  const [deleteCarService] = useDeleteCarServiceMutation();

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
          refetch();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete service";
          toast.error(errorMessage);
        }
      },
    });
  };

  // Handle edit action
  const handleEdit = (id: string) => {
   
    console.log("Edit", id);
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
            {text.length > 50 ? `${text.slice(0, 50)}...` : text}
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
          <Button type="primary" onClick={() => handleEdit(record.key)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.key)}>
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
    })) || [];

  return (
    <div>
      <h2 className="lg:text-4xl font-bold text-center">All Services</h2>
      <Table columns={columns} dataSource={myData} />
    </div>
  );
};

export default DashboardServices;
