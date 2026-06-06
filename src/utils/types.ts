export type User = {
  id: number;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  profile_image_path: string;
};

export type PublicUser = Omit<User, "email">;

export type Ad = {
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

export type AdCard = Pick<
  Ad,
  "id" | "title" | "price" | "image_path" | "city_name" | "state_name"
>;

export type LoginApiSchema = {
  email: string;
  password: string;
};

export type LoginResponseSchema = {
  token: string;
};

export type RegisterResponseSchema = {
  token: string;
  data: User;
};

export type AdsApiResponseSchema = {
  rowCount: number;
  rows: [AdCard];
};

export type AdsByUserApiResponseSchema = {
  userdata: PublicUser;
  rowCount: number;
  rows: [AdCard];
};

export type PatchUserSchema = Partial<PublicUser>;

export type PostAdSchema = Pick<
  Ad,
  "title" | "description" | "price" | "image_path"
> & { city_id: string; category_id: string };

export type PatchAdSchema = Partial<
  PostAdSchema & {
    state_id: string;
  }
>;
