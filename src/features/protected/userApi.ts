import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL, getMeApi } from "../../utils/apis";
import {
  type MyAdsApiResponseSchema,
  type PatchAdResSchema,
  type PatchAdSchema,
  type PatchUserResSchema,
  type PatchUserSchema,
  type PostAdResponseSchema,
  type PostAdSchema,
  type User,
} from "./types";
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
    patchMe: build.mutation<PatchUserResSchema, PatchUserSchema>({
      query: (body) => ({
        url: getMeApi,
        method: "PATCH",
        body: body,
      }),
    }),
    getMyAds: build.query<MyAdsApiResponseSchema, void>({
      query: () => getMeApi + "/ads",
    }),
    getMyAd: build.query<AdDetailed, number>({
      query: (adId) => getMeApi + "/ads" + "/" + adId,
    }),
    postAd: build.mutation<PostAdResponseSchema, PostAdSchema>({
      query: (body) => ({
        url: getMeApi + "/ads",
        method: "Post",
        body: body,
      }),
    }),
    patchAd: build.mutation<PatchAdResSchema, PatchAdSchema & { adId: number }>(
      {
        query: ({ adId, ...body }) => ({
          url: getMeApi + "/ads" + "/" + adId,
          method: "PATCH",
          body: body,
        }),
      },
    ),
    deleteAd: build.mutation<string, number>({
      query: (adId) => ({
        url: getMeApi + "/ads" + "/" + adId,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetMyAdsQuery,
  useDeleteMeMutation,
  useGetMyAdQuery,
  usePostAdMutation,
  useDeleteAdMutation,
  usePatchMeMutation,
  usePatchAdMutation,
} = userApi;
