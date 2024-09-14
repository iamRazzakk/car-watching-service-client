import Title from "../../shared/Title/Title";
import OurServiceCard from "./OurServiceCard";
import '../../css/Heading.css'
export type TOurService={
  id:number,
  name:string,
  description:string,
  icon:string
}
const OurService = () => {
  const services = [
    {
      id: 1,
      name: "Exterior Wash",
      description:
        "A thorough exterior wash to remove dirt, grime, and debris, leaving your car sparkling clean.",
      icon: "FaCarCrash",
    },
    
    {
      id: 3,
      name: "Engine Detailing",
      description:
        "Cleaning and detailing of the engine bay to remove grease, dirt, and debris.",
      icon: "FaCog",
    },
    {
      id: 4,
      name: "Full Service Wash",
      description:
        "Includes a complete exterior wash and interior cleaning for a thorough refresh.",
      icon: "FaCarSide",
    },
    {
        id: 2,
        name: "Interior Cleaning",
        description:
          "Deep cleaning of the car’s interior including vacuuming, dusting, and sanitizing.",
        icon: "FaVacuum", 
      },
    {
      id: 5,
      name: "Wax and Polish",
      description:
        "Application of high-quality wax and polish to enhance the shine and protect the exterior.",
      icon: "FaPaintBrush",
    },
    {
      id: 6,
      name: "Premium Detailing",
      description:
        "A comprehensive detailing package including exterior wash, interior cleaning, and engine detailing.",
      icon: "FaStar",
    },
  ];

  return (
    <div className="lg:mt-8 md:mt-6 mt-4">
        <Title text="Our Services" level={1} className="text-xl title" />
      <div className="lg:p-6 md:p-4 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service:TOurService) => (
          <OurServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default OurService;
