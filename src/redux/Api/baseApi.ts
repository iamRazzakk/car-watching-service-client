import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';


// Create a base query with token authentication
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/',
  prepareHeaders: (headers, { getState }) => {
    // Get the token from state, localStorage, or any other secure location
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
  tagTypes: ['Service', 'OtherType'],
  endpoints: () => ({}),
});