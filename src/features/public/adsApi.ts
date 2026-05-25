import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL, getAdsApi } from "../../utils/apis";
import { type AdsApiResponseSchema } from "./types";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (build) => ({
    getAds: build.query<AdsApiResponseSchema, void>({
      query: () => getAdsApi,
    }),
  }),
});

export const { useGetAdsQuery } = adsApi;
