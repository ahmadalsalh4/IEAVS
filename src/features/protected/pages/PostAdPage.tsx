import { useNavigate } from "react-router";
import { useState } from "react";
import type { PostAdSchema } from "../types";
import { usePostAdMutation } from "../userApi";
import LoadCategories from "../../../utils/LoadCategories";
import LoadCities from "../../../utils/LoadCities";

export default function PostAdPage() {
  const [PostAd] = usePostAdMutation();
  const [data, setData] = useState<PostAdSchema>({
    title: "",
    description: "",
    price: "",
    category_id: "",
    city_id: "",
  });
  const navigate = useNavigate();

  return (
    <div className="myContainer">
      <div className="myFormCard">
        <h1 className="myHead">Add Post Page</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await PostAd(data);
            if (response.data) {
              navigate("/me");
            } else if (response.error) {
              console.log(response.error);
            }
          }}
        >
          <label htmlFor="title">title: </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
          <label htmlFor="price">price: </label>
          <input
            type="text"
            id="price"
            value={data.price}
            onChange={(e) => {
              setData({ ...data, price: e.target.value });
            }}
          />
          <label htmlFor="description">description: </label>
          <input
            type="text"
            id="description"
            value={data.description}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
            }}
          />

          <select
            id="category_id"
            value={data.category_id}
            onChange={(e) => {
              setData({ ...data, category_id: e.target.value });
            }}
          >
            <LoadCategories />
          </select>
          <select
            id="city_id"
            value={data.city_id}
            onChange={(e) => {
              setData({ ...data, city_id: e.target.value });
            }}
          >
            <LoadCities />
          </select>

          <button type="submit" className="mt-3">
            post ad
          </button>
        </form>
      </div>
    </div>
  );
}
