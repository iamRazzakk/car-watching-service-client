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
  isBooked: "available" | "canceled" | "booked";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ViewAllSlote = (props: any) => {
  const { serviceId, date } = props;
  const { data: slots, isLoading: slotsLoading } = useGetAllSlotsQuery({
    serviceId,
    date,
  });
  const [updateSlotStatus] = useUpdateSlotStatusMutation();

  const handleStatusUpdate = async (
    slotId: string,
    newStatus: "available" | "canceled"
  ) => {
    try {
      await updateSlotStatus({ slotId, body: { status: newStatus } }).unwrap();
      toast.success("Slot status updated successfully");
    } catch (error) {
      let errorMessage = "Error updating status";

      // Check if the error is a known structure
      if (typeof error === "object" && error !== null) {
        if (
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null
        ) {
          console.log(error);
        } else if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message; // Use the error's message
        }
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

  // Assuming slots.data is an array of slot objects
  const filteredSlots: Slot[] = slots?.data || [];

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
      render: (status: "available" | "canceled" | "booked") => (
        <Tag
          color={
            status === "available"
              ? "green"
              : status === "canceled"
              ? "volcano"
              : "blue"
          }
        >
          {status === "available"
            ? "Available"
            : status === "canceled"
            ? "Canceled"
            : "Booked"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (slot: Slot) => (
        <Dropdown
          overlay={getMenu(
            slot._id,
            slot.isBooked !== "booked" ? slot.isBooked : "available"
          )}
          trigger={["click"]}
        >
          <Button disabled={slot.isBooked === "booked"}>
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
