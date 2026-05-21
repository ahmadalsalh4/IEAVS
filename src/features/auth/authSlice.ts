import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Auth } from "./types";

const LSToken = localStorage.getItem("token");
const initialState: Auth = {
  token: LSToken || "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    logOut: (state) => {
      localStorage.setItem("token", "");
      state.token = "";
    },
  },
});

export const { setToken, logOut } = authSlice.actions;
