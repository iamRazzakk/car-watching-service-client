import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TSlotBookmark = {
  serviceId: string;
  slotId: string;
  serviceName: string;
  serviceImage: string;
  duration: number;
  price: number;
  startTime: string;
  endTime: string;
  sloteDate?:Date
};

type SlotBookmarkState = {
  bookmark: TSlotBookmark | null; // Store a single bookmark
};

const initialState: SlotBookmarkState = {
  bookmark: null, // Initially, no bookmark is selected
};

const slotBookmarkSlice = createSlice({
  name: "slotBookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<TSlotBookmark>) => {
      state.bookmark = action.payload; // Add a single bookmark
    },
    removeBookmark: (state) => {
      state.bookmark = null; // Clear the bookmark
    },
    clearBookmarks: (state) => {
      state.bookmark = null; // Clear the bookmark
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks } =
  slotBookmarkSlice.actions;
export default slotBookmarkSlice.reducer;

// Selector to get the single slot bookmark
export const getSlotBookmark = (state: RootState) => state.slotBookmarks.bookmark;
