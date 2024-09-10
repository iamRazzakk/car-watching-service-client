import Title from "../../shared/Title/Title";
import PricingSectionCard from "./PricingSectionCard";

const PricingSection = () => {
  const services = [
    {
      id: 1,
      serviceName: "Basic Wash",
      price: "$20",

      subcategories: [
        { id: 1, name: "Exterior Wash" },
        { id: 2, name: "Interior Cleaning" },
        { id: 3, name: "Tire Shine" },
      ],
    },
    {
      id: 2,
      serviceName: "Premium Wash",
      price: "$40",

      subcategories: [
        { id: 1, name: "Hand Wash" },
        { id: 2, name: "Wax Application" },
        { id: 3, name: "Tire Cleaning" },
        { id: 4, name: "Windows Clean" },
      ],
    },
    {
      id: 3,
      serviceName: "Ultimate Detail",
      price: "$70",

      subcategories: [
        { id: 1, name: "Exterior Wash" },
        { id: 2, name: "Interior Detailing" },
        { id: 3, name: "Engine Detailing" },
        { id: 4, name: "Clay Bar Treatment" },
      ],
    },
  ];

  return (
    <div>
      <Title text="Pricing Plans" level={1} className="text-xl title" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
        {services.map((service) => (
          <PricingSectionCard
            key={service.id}
            serviceName={service.serviceName}
            price={service.price}
            subcategories={service.subcategories}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
