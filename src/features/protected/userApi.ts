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
  tagTypes: ["me", "myAds"],

  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => getMeApi,
      providesTags: ["me"],
    }),
    deleteMe: build.mutation<string, void>({
      query: () => ({
        url: getMeApi,
        method: "DELETE",
      }),
      invalidatesTags: ["me"],
    }),
    patchMe: build.mutation<PatchUserResSchema, PatchUserSchema>({
      query: (body) => ({
        url: getMeApi,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["me"],
    }),

    getMyAds: build.query<MyAdsApiResponseSchema, void>({
      query: () => getMeApi + "/ads",
      providesTags: ["myAds"],
    }),
    getMyAd: build.query<AdDetailed, number>({
      query: (adId) => getMeApi + "/ads" + "/" + adId,
      providesTags: (_, __, adId) => [{ type: "myAds", id: adId }],
    }),
    postAd: build.mutation<PostAdResponseSchema, PostAdSchema>({
      query: (body) => ({
        url: getMeApi + "/ads",
        method: "Post",
        body: body,
      }),
      invalidatesTags: ["myAds"],
    }),
    patchAd: build.mutation<PatchAdResSchema, PatchAdSchema & { adId: number }>(
      {
        query: ({ adId, ...body }) => ({
          url: getMeApi + "/ads" + "/" + adId,
          method: "PATCH",
          body: body,
        }),
        invalidatesTags: (_, __, { adId }) => [{ type: "myAds", id: adId }],
      },
    ),
    deleteAd: build.mutation<string, number>({
      query: (adId) => ({
        url: getMeApi + "/ads" + "/" + adId,
        method: "DELETE",
      }),
      invalidatesTags: ["myAds"],
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
