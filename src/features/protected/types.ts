import type { RegisterApiSchema } from "../auth/types";

export type User = {
  id: number;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  profile_image_path: string;
};

export type MyAd = {
  id: number;
  title: string;
  price: string;
  date: string;
  image_path: string;
  city_name: string;
  state_name?: string;
};

export type MyAdsApiResponseSchema = {
  rowCount: number;
  rows: [MyAd];
};

export type PostAdSchema = {
  title: string;
  description: string;
  price: string;
  category_id: string;
  city_id: string;
};

export type PostAdResponseSchema = {
  id: number;
  title: string;
  price: string;
};

export type PatchUserSchema = Partial<Omit<RegisterApiSchema, "email">>;
export type PatchUserResSchema = Omit<RegisterApiSchema, "password"> & {
  id: number;
};

export type PatchAdSchema = Partial<
  PostAdSchema & {
    state_id: string;
  }
>;
export type PatchAdResSchema = PatchAdSchema & {
  id: number;
  date: string;
  image_path: string;
  user_id: number;
};
