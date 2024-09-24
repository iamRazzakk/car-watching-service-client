export type Slot ={
    _id: string; 
    service: string; 
    date: string; 
    startTime: string; 
    endTime: string; 
    isBooked: "available" | "booked";
    sloteDate?: Date
}