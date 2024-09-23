import { Table } from 'antd';
import { useGetAllOrdersQuery } from '../../../redux/Api/orderApi/orderApi';
import { useAppSelector } from '../../../redux/hooks';
import { useCurrentUser } from '../../../redux/features/auth/authslice';
import LoadingPage from '../../../pages/Loading/LoadingPage';
import { Booking } from '../../../types/UpcommingTypes/Upcomming.Types';

const PastBookings: React.FC = () => {
  const { data: bookings, isLoading } = useGetAllOrdersQuery(undefined);
  const currentUser = useAppSelector(useCurrentUser);

  // Filter bookings based on the current user
  const pastBookings = bookings?.data?.filter(
    (booking: Booking) => booking.user.email === currentUser?.email
  );

  if (isLoading) return <LoadingPage />;

  const columns = [
    {
      title: 'Service Name',
      dataIndex: ['serviceDetails', 'serviceName'], 
      key: 'serviceName',
    },
    {
      title: 'Date',
      dataIndex: ['serviceDetails', 'startTime'], 
      key: 'date',
    },
    {
      title: 'Time',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Booking) =>
        `${record.serviceDetails.startTime} - ${record.serviceDetails.endTime}`, 
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Table
      dataSource={pastBookings?.map((booking: Booking) => ({
        ...booking,
        key: booking._id, // Assigning _id as row key
      }))}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default PastBookings;