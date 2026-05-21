import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { authApis } from "./features/auth/authApis";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApis.reducerPath]: authApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApis.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
