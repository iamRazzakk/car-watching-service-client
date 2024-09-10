import Button from "../../shared/Button/Button";
import Title from "../../shared/Title/Title";
import aboutUs from "../../../src/assets/aboutUs.jpg";
import { FaRegCheckCircle } from "react-icons/fa";
import NavigationButtons from "../../shared/NavigationButtons/NavigationButtons";

const AboutUs = () => {
  return (
    <div className="container mx-auto">
      <NavigationButtons />
      <div className="lg:mt-8 md:mt-6 mt-4 lg:px-0 px-6">
        <Title
          text="About Us"
          level={1}
          className="text-xl  font-bold text-[#517de9]"
        />

        <div className="lg:flex items-center gap-6 ">
          <div className="flex-1 ">
            <Title
              text="Sparkle, Shine, Impress Every Time"
              level={1}
              className="text-4xl  font-bold lg:mb-4 md:mb-3 mb-2"
            />
            <div className="flex items-center gap-4">
              <FaRegCheckCircle className="text-[#517de9]" />
              <p>Glisten On Where Cars Embrace Brilliance.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaRegCheckCircle className="text-[#517de9]" />
              <p>Dazzle Drives Our Craft, Your Shimmering Car.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaRegCheckCircle className="text-[#517de9]" />
              <p>Elegance in Every Bubble, Brilliance in Shine.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaRegCheckCircle className="text-[#517de9]" />
              <p>Suds of Joy, Gleam of Automotive Luxury.</p>
            </div>
            <div className="space-y-4 lg:mt-4 md:mt-3 mt-2">
              <Title
                text="Elevating your business with car washing"
                level={1}
                className="text-4xl  font-bold "
              />
              <p>
                Revitalize your vehicle’s shine with our premium car wash
                services! Our skilled team uses eco-friendly products to ensure
                a spotless, streak-free finish. From exterior detailing to tire
                care, we provide a thorough cleaning experience.
              </p>
              <Button text="Read more" category="secondary" />
            </div>
          </div>
          <div className="flex-1 h-full lg:mt-8 md:mt-6 mt-4">
            <img className="h-full" src={aboutUs} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
