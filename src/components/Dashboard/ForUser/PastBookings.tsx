import React from 'react';
import { Table } from 'antd';

// Dummy data for past bookings
const pastBookings = [
  {
    id: '1',
    serviceName: 'Service A',
    date: '2024-09-01',
    time: '10:00 AM',
    status: 'Completed',
  },
  {
    id: '2',
    serviceName: 'Service B',
    date: '2024-09-05',
    time: '11:00 AM',
    status: 'Completed',
  },
  {
    id: '3',
    serviceName: 'Service C',
    date: '2024-09-10',
    time: '02:00 PM',
    status: 'Completed',
  },
  // Add more dummy data as needed
];

const PastBookings: React.FC = () => {
  // Define columns for the table
  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
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
      dataSource={pastBookings}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }} // Adjust pagination as needed
    />
  );
};

export default PastBookings;
