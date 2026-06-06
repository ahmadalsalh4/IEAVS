import { useNavigate } from "react-router";
import { useState } from "react";
import { usePostAdMutation } from "../userApi";
import LoadCategories from "../../../utils/LoadCategories";
import LoadCities from "../../../utils/LoadCities";
import type { PostAdSchema } from "../../../utils/types";
import MyError from "../../../components/MyError";

export default function PostAdPage() {
  const [PostAd] = usePostAdMutation();
  const [form, setForm] = useState<PostAdSchema>({
    title: "",
    description: "",
    price: "",
    image_path: "",
    category_id: "",
    city_id: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="myContainer">
      <div className="myFormCard">
        <h1 className="myHead">Add Post Page</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { data, error } = await PostAd(form);
            if (data) {
              navigate("/me");
            } else if (error) {
              setErrorMessage(error.data.error);
            }
          }}
        >
          <label htmlFor="title">title: </label>
          <input
            type="text"
            id="title"
            value={form.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
          />
          <label htmlFor="price">price: </label>
          <input
            type="text"
            id="price"
            value={form.price}
            onChange={(e) => {
              setForm({ ...form, price: e.target.value });
            }}
          />
          <label htmlFor="description">description: </label>
          <input
            type="text"
            id="description"
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
          />

          <select
            id="category_id"
            value={form.category_id}
            onChange={(e) => {
              setForm({ ...form, category_id: e.target.value });
            }}
          >
            <LoadCategories />
          </select>
          <select
            id="city_id"
            value={form.city_id}
            onChange={(e) => {
              setForm({ ...form, city_id: e.target.value });
            }}
          >
            <LoadCities />
          </select>
          <MyError errorMessage={errorMessage}></MyError>
          <button type="submit" className="mt-3">
            post ad
          </button>
        </form>
      </div>
    </div>
  );
}
