import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL, getAdsApi } from "../../utils/apis";
import type {
  AdsByUserApiResponseSchema,
  AdDetailed,
  AdsApiResponseSchema,
} from "./types";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (build) => ({
    getAds: build.query<AdsApiResponseSchema, void>({
      query: () => getAdsApi,
    }),
    getAdsByCatagory: build.query<AdsApiResponseSchema, string>({
      query: (categoryName) => getAdsApi + `?category=${categoryName}`,
    }),
    getAd: build.query<AdDetailed, number>({
      query: (adId) => getAdsApi + "/" + adId,
    }),
    getAdsByUser: build.query<AdsByUserApiResponseSchema, number>({
      query: (userId) => getAdsApi + "/user/" + userId,
    }),
    getAdBySearch: build.query<AdsApiResponseSchema, string>({
      query: (searchWord) => getAdsApi + `/?search=${searchWord}`,
    }),
  }),
});

export const {
  useGetAdsQuery,
  useGetAdsByCatagoryQuery,
  useGetAdQuery,
  useGetAdsByUserQuery,
  useGetAdBySearchQuery,
} = adsApi;
