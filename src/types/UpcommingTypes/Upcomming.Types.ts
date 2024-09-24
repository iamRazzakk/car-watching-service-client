export type User = {
  _id: string;
  name: string;
  email: string;
};

export type VehicleDetails = {
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};

export type ServiceDetails = {
  serviceName: string;
  price: number;
  duration: number;
  startTime: string;
  endTime: string;
  date?: string;
};

export type Booking = {
  _id: string;
  user: User;
  vehicleDetails: VehicleDetails;
  serviceDetails: ServiceDetails;
  totalPrice: number;
  status: "Pending" | "Success";
  paymentStatus: "Pending" | "Paid";
  transactionId: string;
  date?: string;
  time?: string;
};
