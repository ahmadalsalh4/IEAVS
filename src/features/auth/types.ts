export type LoginApiSchema = {
  email: string;
  password: string;
};

export type LoginResponseSchema = {
  token: string;
};

export type RegisterApiSchema = {
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password: string;
  profile_image_path?: string;
};

export type RegisterResponseSchema = {
  token: string;
  data: {
    id: number;
    name: string;
    surname: string;
    phone_number: string;
    email: string;
    profile_image_path: string;
  };
};
