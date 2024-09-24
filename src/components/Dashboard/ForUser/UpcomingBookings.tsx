import { Card, Col, Row, Typography } from "antd";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { useGetAllOrdersQuery } from "../../../redux/Api/orderApi/orderApi";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/authslice";
import moment from "moment";
import LoadingPage from "../../../pages/Loading/LoadingPage";
import { Booking } from "../../../types/UpcommingTypes/Upcomming.Types";

const { Title } = Typography;

const UpcomingBookings: React.FC = () => {
  const { data: bookings, isLoading } = useGetAllOrdersQuery(undefined);
  const currentUser = useAppSelector(useCurrentUser);

  if (isLoading) return <LoadingPage />;

  const today = moment().startOf("day");

  const upcomingBookings = bookings?.data?.filter((booking: Booking) => {
    const serviceDetailsDate = moment(booking.serviceDetails?.date);
    const isUserMatch = booking.user.email === currentUser?.email;
    const isDateAfterToday = serviceDetailsDate.isAfter(today);

    return isUserMatch && isDateAfterToday;
  });

  // Custom countdown renderer for bookings
  const countdownRenderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
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
    <Row gutter={[16, 16]} justify="center">
      {upcomingBookings?.length > 0 ? (
        upcomingBookings.map((booking: Booking) => {
          const bookingDateTime = moment(
            `${moment(booking.serviceDetails.date).format("YYYY-MM-DD")}T${booking.serviceDetails.startTime}`
          );
          

          return (
            <Col key={booking._id} xs={24} sm={12} md={8} lg={6}>
              <Card title={`Service: ${booking.serviceDetails.serviceName}`}>
                <p>
                  Date:{" "}
                  {moment(booking.serviceDetails.date).format("YYYY-MM-DD")}
                </p>
                <p>
                  Time: {booking.serviceDetails.startTime} -{" "}
                  {booking.serviceDetails.endTime}
                </p>
                <p>Status: {booking.status}</p>
                <Title level={4}>Countdown:</Title>
                <Countdown
                  date={bookingDateTime.toDate()} // Ensure this is the correct date
                  renderer={countdownRenderer}
                />
              </Card>
            </Col>
          );
        })
      ) : (
        <Col span={24}>
          <p style={{ textAlign: "center" }}>No upcoming bookings found.</p>
        </Col>
      )}
    </Row>
  );
};

export default UpcomingBookings;
