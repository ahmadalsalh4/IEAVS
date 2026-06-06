import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL, loginApi, registerApi } from "../../utils/apis";
import type {
  LoginApiSchema,
  RegisterApiSchema,
  LoginResponseSchema,
  RegisterResponseSchema,
} from "../../utils/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (build) => ({
    logIn: build.mutation<LoginResponseSchema, LoginApiSchema>({
      query: (body) => ({
        url: loginApi,
        method: "POST",
        body: body,
      }),
    }),
    register: build.mutation<RegisterResponseSchema, RegisterApiSchema>({
      query: (body) => ({
        url: registerApi,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useLogInMutation, useRegisterMutation } = authApi;
