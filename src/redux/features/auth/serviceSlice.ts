import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCreateService } from "../../../types/services.type";

interface ServicesState {
  services: TCreateService[];
  filteredServices: TCreateService[];
  searchQuery: string;
  filters: {
    minPrice: number;
    maxPrice: number;
  };
  sort: string; 
}

const initialState: ServicesState = {
  services: [],
  filteredServices: [],
  searchQuery: "",
  filters: {
    minPrice: 0,
    maxPrice: 0,
  },
  sort: "new",
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<TCreateService[]>) {
      state.services = action.payload;
      state.filteredServices = applyFilters(state); 
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredServices = applyFilters(state); 
    },
    setFilter(state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) {
      state.filters = action.payload;
      state.filteredServices = applyFilters(state);
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
      state.filteredServices = applyFilters(state); 
    },
    resetFilters(state) {
      state.searchQuery = "";
      state.filters = { minPrice: 0, maxPrice: 0 };
      state.sort = "new";
      state.filteredServices = applyFilters(state); 
    },
  },
});

const applyFilters = (state: ServicesState): TCreateService[] => {
  let filtered = [...state.services];

  // Filter by search query
  if (state.searchQuery) {
    filtered = filtered.filter(service =>
      service.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  // Filter by price range
  if (state.filters.minPrice || state.filters.maxPrice) {
    filtered = filtered.filter(service =>
      service.price >= state.filters.minPrice && service.price <= state.filters.maxPrice
    );
  }

  // Sort services
  if (state.sort === "new") {
    filtered.sort((a, b) => (a._id > b._id ? -1 : 1)); // Assuming `_id` represents time of creation
  } else if (state.sort === "old") {
    filtered.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else if (state.sort === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sort === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
};

export const { setServices, setSearchQuery, setFilter, setSort, resetFilters } = servicesSlice.actions;

export default servicesSlice.reducer;
