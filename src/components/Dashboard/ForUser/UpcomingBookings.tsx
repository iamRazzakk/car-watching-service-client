import { Card, Col, Row, Typography } from 'antd';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useGetAllOrdersQuery } from '../../../redux/Api/orderApi/orderApi';
import { useAppSelector } from '../../../redux/hooks';
import { useCurrentUser } from '../../../redux/features/auth/authslice';
import moment from 'moment';
import LoadingPage from '../../../pages/Loading/LoadingPage';
import { Booking } from '../../../types/UpcommingTypes/Upcomming.Types';

// Use the defined types
const { Title } = Typography;

const UpcomingBookings: React.FC = () => {
  const { data: bookings, isLoading } = useGetAllOrdersQuery(undefined);
  const currentUser = useAppSelector(useCurrentUser);

  if (isLoading) return <LoadingPage />;

  // Filter upcoming bookings (based on user and booking date)
  const upcomingBookings = bookings?.data?.filter((booking:Booking) => {
    const bookingDateTime = moment(`${booking.date}T${booking.time}`, "YYYY-MM-DDTHH:mm");
    return moment().isBefore(bookingDateTime) && booking.user._id === currentUser?._id;
  });

  // Custom countdown renderer
  const countdownRenderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Booking time has passed!</span>;
    }
    return (
      <span>
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </span>
    );
  };

  return (
    <Row gutter={16}>
      {upcomingBookings?.length > 0 ? (
        upcomingBookings.map((booking:Booking) => (
          <Col span={8} key={booking._id}>
            <Card title={`Service: ${booking.serviceDetails.serviceName}`}>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.serviceDetails.startTime} - {booking.serviceDetails.endTime}</p>
              <p>Status: {booking.status}</p>
              <Title level={4}>Countdown:</Title>
              <Countdown
                date={moment(`${booking.date}T${booking.serviceDetails.startTime}`).toDate()}
                renderer={countdownRenderer}
              />
            </Card>
          </Col>
        ))
      ) : (
        <p>No upcoming bookings found</p>
      )}
    </Row>
  );
};

export default UpcomingBookings;
