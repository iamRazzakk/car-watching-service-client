import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TSlotBookmark = {
  serviceId: string;
  slotId: string;
  serviceName: string;
  image: string;
  duration: number;
  price: number;
  startTime: string;
  endTime: string;
  sloteDate?: Date;
};

type SlotBookmarkState = {
  bookmark: TSlotBookmark | null;
};

const initialState: SlotBookmarkState = {
  bookmark: null,
};

const slotBookmarkSlice = createSlice({
  name: "slotBookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<TSlotBookmark>) => {
      state.bookmark = action.payload;
    },
    removeBookmark: (state) => {
      state.bookmark = null;
    },
    clearBookmarks: (state) => {
      state.bookmark = null;
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks } =
  slotBookmarkSlice.actions;
export default slotBookmarkSlice.reducer;

// Selector to get the single slot bookmark
export const getSlotBookmark = (state: RootState) => state.slotBookmarks.bookmark;
