import { configureStore } from "@reduxjs/toolkit";
import { authApis } from "./features/auth/authApis";

export const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApis.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
