import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authslice";
import { baseApi } from "./Api/baseApi";
import servicesReducer from "../redux/features/auth/serviceSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persisConfig = {
  key: "auth",
  storage,
};
const persistAuthReducer = persistReducer(persisConfig, authReducer);
export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    services: servicesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,]
      }
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
