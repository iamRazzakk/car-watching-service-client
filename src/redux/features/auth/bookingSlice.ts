import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: string;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  imageUrl: string;
}

interface BookingState {
  selectedService: Service | null;
  selectedSlot: Slot | null;
}

const initialState: BookingState = {
  selectedService: null,
  selectedSlot: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedService(state, action: PayloadAction<Service | null>) {
      state.selectedService = action.payload;
    },
    setSelectedSlot(state, action: PayloadAction<Slot | null>) {
      state.selectedSlot = action.payload;
    },
  },
});

export const { setSelectedService, setSelectedSlot } = bookingSlice.actions;

export default bookingSlice.reducer;
