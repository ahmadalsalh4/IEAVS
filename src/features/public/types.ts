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
