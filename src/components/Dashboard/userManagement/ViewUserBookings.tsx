// src/components/ViewUserBookings/ViewUserBookings.tsx
import { Table } from "antd";
import { useGetUserBookingsQuery } from "../../../redux/Api/bookingService/bookingServiceApi";
import LoadingPage from "../../../pages/Loading/LoadingPage";

const ViewUserBookings = () => {
  const { data: bookings, isLoading } = useGetUserBookingsQuery(undefined);

  if (isLoading) return <LoadingPage />;

  const columns = [
    {
      title: "Service Name",
      dataIndex: "serviceId",
      key: "serviceId",
      render: (serviceId: any) => serviceId?.name || "N/A",
    },
    {
      title: "Slot Date",
      dataIndex: "slotId",
      key: "slotId",
      render: (slotId: any) => slotId?.date || "N/A",
    },
    {
      title: "Slot Time",
      dataIndex: "slotId",
      key: "slotId",
      render: (slotId: any) => `${slotId?.startTime} - ${slotId?.endTime}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={bookings?.data?.map((booking: any) => ({
          ...booking,
          key: booking._id,
        }))}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ViewUserBookings;
