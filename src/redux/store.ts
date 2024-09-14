import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/features/auth/authslice'
import { baseApi } from './Api/baseApi'
import servicesReducer from '../redux/features/auth/serviceSlice'

export const store = configureStore({
  reducer: {
   auth:authReducer,
   services: servicesReducer,
   [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch