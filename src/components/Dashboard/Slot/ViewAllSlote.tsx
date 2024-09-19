import React from "react";
import { Table, Button, Tag, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import LoadingPage from "../../../pages/Loading/LoadingPage";
import {
  useGetAllSlotsQuery,
  useUpdateSlotStatusMutation,
} from "../../../redux/Api/slot/slotApi";

// Define types for the slot data
interface Slot {
  _id: string;
  service: {
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "canceled";
}

const ViewAllSlote: React.FC = () => {
  const { data: slots, isLoading: slotsLoading } =
    useGetAllSlotsQuery(undefined);
  const [updateSlotStatus] = useUpdateSlotStatusMutation();

  const handleStatusUpdate = async (
    slotId: string,
    newStatus: "available" | "canceled"
  ) => {
    try {
      await updateSlotStatus({ id: slotId, status: newStatus }).unwrap();
      toast.success("Slot status updated successfully");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = "Error updating status";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const getMenu = (slotId: string, currentStatus: "available" | "canceled") => (
    <Menu>
      {currentStatus === "available" && (
        <Menu.Item
          key="canceled"
          onClick={() => handleStatusUpdate(slotId, "canceled")}
        >
          Cancel
        </Menu.Item>
      )}
      {currentStatus === "canceled" && (
        <Menu.Item
          key="available"
          onClick={() => handleStatusUpdate(slotId, "available")}
        >
          Available
        </Menu.Item>
      )}
    </Menu>
  );

  if (slotsLoading) return <LoadingPage />;

  // Map to include both available and canceled slots
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredSlots: Slot[] = (slots?.data || []).map((slot: any) => slot);

  const columns = [
    {
      title: "Service Name",
      dataIndex: ["service", "name"],
      key: "serviceName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      key: "status",
      render: (status: "available" | "canceled") => (
        <Tag color={status === "available" ? "green" : "volcano"}>
          {status === "available" ? "Available" : "Canceled"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (slot: Slot) => (
        <Dropdown
          overlay={getMenu(slot._id, slot.isBooked)}
          trigger={["click"]}
        >
          <Button>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Manage Slots</h1>
      <Table columns={columns} dataSource={filteredSlots} rowKey="_id" />
    </div>
  );
};

export default ViewAllSlote;
