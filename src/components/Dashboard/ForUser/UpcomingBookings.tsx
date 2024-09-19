import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import moment from 'moment';

// Dummy data for upcoming bookings
const upcomingBookings = [
  {
    id: '1',
    serviceName: 'Service A',
    date: '2024-09-20',
    time: '10:00 AM',
    status: 'Upcoming',
    countdownEnd: new Date('2024-09-20T10:00:00'), // Use a future date for countdown
  },
  {
    id: '2',
    serviceName: 'Service B',
    date: '2024-09-25',
    time: '11:00 AM',
    status: 'Upcoming',
    countdownEnd: new Date('2024-09-25T11:00:00'),
  },
  {
    id: '3',
    serviceName: 'Service C',
    date: '2024-09-30',
    time: '02:00 PM',
    status: 'Upcoming',
    countdownEnd: new Date('2024-09-30T14:00:00'),
  },
  // Add more dummy data as needed
];

const { Title } = Typography;

const UpcomingBookings: React.FC = () => {
  // Function to get countdown time
  const getCountdown = (endDate: Date) => {
    const duration = moment.duration(moment(endDate).diff(moment()));
    return `${Math.floor(duration.asDays())} days ${duration.hours()} hours ${duration.minutes()} minutes`;
  };

  return (
    <Row gutter={16}>
      {upcomingBookings.map((booking) => (
        <Col span={8} key={booking.id}>
          <Card title={`Service: ${booking.serviceName}`}>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Status: {booking.status}</p>
            <Title level={4}>Countdown:</Title>
            <p>{getCountdown(booking.countdownEnd)}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default UpcomingBookings;
