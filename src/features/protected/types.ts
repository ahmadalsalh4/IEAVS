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
  state_name: string;
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
