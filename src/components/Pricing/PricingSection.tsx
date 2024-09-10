import PricingSectionCard from "./PricingSectionCard";

const PricingSection = () => {
  const services = [
    {
      id: 1,
      serviceName: "Basic Wash",
      description:
        "A quick exterior wash and rinse to remove dirt and grime. Perfect for a regular refresh.",
      price: "$20",
      duration: "30 minutes",
    },
    {
      id: 2,
      serviceName: "Premium Wash",
      description:
        "An enhanced wash including exterior hand wash, wax application, and tire shine. Ideal for a more detailed clean.",
      price: "$40",
      duration: "1 hour",
    },
    {
      id: 3,
      serviceName: "Ultimate Detail",
      description:
        "Our most comprehensive service with exterior wash, interior detailing, wax treatment, and interior vacuuming. For the ultimate clean and shine.",
      price: "$70",
      duration: "1.5 hours",
    },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {services.map((service) => (
        <PricingSectionCard
          key={service.id}
          serviceName={service.serviceName}
          description={service.description}
          price={service.price}
          duration={service.duration}
        />
      ))}
    </div>
  );
};

export default PricingSection;
