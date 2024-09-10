import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Button from "../Button/Button";

const HeroSection = () => {
  const images = [img1, img2, img3];
  const slidesInfo = [
    {
      title: "Full Exterior Car Wash",
      description:
        "Get your car shining with our premium exterior wash service.",
      button1Text: "Read More",
      button2Text: "Order Now",
    },
    {
      title: "Interior Detailing",
      description: "Thorough interior cleaning to refresh your car’s interior.",
      button1Text: "Read More",
      button2Text: "Order Now",
    },
    {
      title: "Complete Car Care",
      description:
        "A comprehensive service for both interior and exterior cleaning.",
      button1Text: "Read More",
      button2Text: "Order Now",
    },
  ];
  const handleButtonClick = (buttonType:string) => {
    console.log(`${buttonType} button clicked`);
  };
  const customPrevArrow = (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-gray-900 hover:text-white cursor-pointer z-10">
      <GrFormPrevious className="text-3xl font-bold" />
    </div>
  );

  const customNextArrow = (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-gray-900 hover:text-white cursor-pointer z-10">
      <GrFormNext className="text-3xl font-bold" />
    </div>
  );

  return (
    <div className="w-full relative">
      <Zoom
        scale={0.6}
        autoplay={true}
        duration={4000}
        prevArrow={customPrevArrow}
        nextArrow={customNextArrow}
        pauseOnHover={false}
      >
        {images.map((each, idx) => (
          <div key={idx} className="relative w-full">
            <img
              className="w-full h-[80vh] md:h-[70vh] lg:h-[90vh] object-cover rounded"
              src={each}
              alt={`slide-${idx}`}
            />
            {/* Title, Description, and Buttons for each slide */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white z-20 bg-black bg-opacity-40">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {slidesInfo[idx].title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-6">
                {slidesInfo[idx].description}
              </p>
              <div className="space-x-4">
              <div className="space-x-4">
                <Button
                  text={slidesInfo[idx].button1Text}
                  type="primary"
                  onClick={() => handleButtonClick('Primary')}
                />
                <Button
                  text={slidesInfo[idx].button2Text}
                  type="secondary"
                  onClick={() => handleButtonClick('Secondary')}
                />
              </div>
              </div>
            </div>
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default HeroSection;
