export type Ad = {
  id: number;
  title: string;
  description: string;
  price: string;
  date: string;
  image_path: string;
  city_name: string;
  category_name: string;
};

export type AdsApiResponseSchema = {
  rowCount: number;
  rows: [Ad];
};

export type AdsByUserApiResponseSchema = {
  userdata: {
    name: string;
    surname: string;
    phone_number: string;
    profile_image_path: string;
  };
  rowCount: number;
  rows: [Ad];
};

export type AdDetailed = {
  id: number;
  title: string;
  description: string;
  price: string;
  date: string;
  image_path: string;
  city_name: string;
  state_name: string;
  category_name: string;
  user_id: number;
};
