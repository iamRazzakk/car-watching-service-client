import { Table } from "antd";
import LoadingPage from "../../../pages/Loading/LoadingPage";
import { useGetAllOrdersQuery } from "../../../redux/Api/orderApi/orderApi";

const ViewUserBookings = () => {
  const { data: bookings, isLoading } = useGetAllOrdersQuery(undefined);

  // If bookings or bookings.data does not exist, handle the case properly
  if (isLoading) return <LoadingPage />;
  if (!bookings || !bookings.data) return <div>No bookings found.</div>;

  const columns = [
    {
      title: "Customer Name",
      dataIndex: ["user", "name"], 
      key: "userName",
    },
    {
      title: "Vehicle Type",
      dataIndex: ["vehicleDetails", "vehicleType"],
      key: "vehicleType",
    },
    {
      title: "Service Name",
      dataIndex: ["serviceDetails", "serviceName"],
      key: "serviceName",
    },
    {
      title: "$ Price",
      dataIndex: ["serviceDetails", "price"],
      key: "price",
    },
    {
      title: "Slot Time",
      key: "slotTime",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: any) =>
        `${record.serviceDetails.startTime} - ${record.serviceDetails.endTime}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataSource={bookings.data.map((order: any) => ({
          ...order,
          key: order._id,
        }))}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ViewUserBookings;