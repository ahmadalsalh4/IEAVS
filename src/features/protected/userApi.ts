import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL, getMeApi } from "../../utils/apis";
import { type User } from "./types";
import { GetToken } from "../../utils/util";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = GetToken();
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => getMeApi,
    }),
  }),
});

export const { useGetMeQuery } = userApi;
