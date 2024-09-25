import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';


// Create a base query with token authentication
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://car-sarvices-api.vercel.app/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; 
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['Service', 'SlotList'],
  endpoints: () => ({}),
});