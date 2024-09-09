import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const HeroSection = () => {
  const images = [img1, img2, img3];

  // Custom Previous Arrow
  const customPrevArrow = (
    <div className='absolute '>
      <div className="absolute right-0 mr-2 p-2 bg-gray-700 bg-opacity-50 rounded-full hover:bg-gray-900 cursor-pointer">

      <GrFormPrevious className='text-5xl font-bold' />
      </div>
    </div>
  );

  // Custom Next Arrow
  const customNextArrow = (
    <div className="absolute right-0 mr-2 p-2 bg-gray-700 bg-opacity-50 rounded-full hover:bg-gray-900 cursor-pointer">
      <GrFormNext />
    </div>
  );

  return (
    <div className="w-full  relative">
      <Zoom
        scale={0.6}
        autoplay={true}
        duration={3000}
        prevArrow={customPrevArrow}
        nextArrow={customNextArrow}
        pauseOnHover={false}
      >
        {images.map((each, index) => (
          <img
            className="w-full h-[80vh] md:h-[70vh] lg:h-[90vh] object-cover"
            key={index}
            src={each}
            alt={`slide-${index}`}
          />
        ))}
      </Zoom>
    </div>
  );
};

export default HeroSection;
