import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Auth } from "./types";

const initialState: Auth = {
  token: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
