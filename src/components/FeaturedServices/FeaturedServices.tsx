import LoadingPage from "../../pages/Loading/LoadingPage";
import ServiceCardPage from "../../pages/ServicePage/ServiceCardPage";
import { useGetAllCarServicesQuery } from "../../redux/Api/services/serviceApi";
import { TCreateService } from "../../types/services.type";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Title from "../../shared/Title/Title";
const FeaturedServices = () => {
  const { data: Services, isLoading } = useGetAllCarServicesQuery();
  if (isLoading) return <LoadingPage />;
  return (
    <div className="lg:p-6 md:p-4 p-3">
    <Title text="Featured Services" level={1} className="text-xl title" />
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          // Responsive breakpoints
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="mySwiper lg:mt-8 md:mt-6 mt-4"
      >
        {Services?.data?.slice(0, 6).map((service: TCreateService) => (
          <SwiperSlide key={service?._id}>
            <ServiceCardPage service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedServices;
