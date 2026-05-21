import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/apis";
import { type Auth, type LoginSchema } from "./types";

export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (build) => ({
    logIn: build.mutation<Pick<Auth, "token">, LoginSchema>({
      query: ({ email, password }) => ({
        url: "authenticat/login",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useLogInMutation } = authApis;
