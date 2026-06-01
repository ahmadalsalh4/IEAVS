import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL, getMeApi } from "../../utils/apis";
import { type MyAdsApiResponseSchema, type User } from "./types";
import { GetToken } from "../../utils/util";
import type { AdDetailed } from "../public/types";

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
    deleteMe: build.mutation<string, void>({
      query: () => ({
        url: getMeApi,
        method: "DELETE",
      }),
    }),
    getMyAds: build.query<MyAdsApiResponseSchema, void>({
      query: () => getMeApi + "/ads",
    }),
    getMyAd: build.query<AdDetailed, number>({
      query: (adId) => getMeApi + "/ads" + "/" + adId,
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetMyAdsQuery,
  useDeleteMeMutation,
  useGetMyAdQuery,
} = userApi;
