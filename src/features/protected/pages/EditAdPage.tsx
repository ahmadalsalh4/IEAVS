import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { PatchAdSchema } from "../types";
import { useGetMyAdQuery, usePatchAdMutation } from "../userApi";

export default function EditAdPage() {
  const navigate = useNavigate();

  const adId = useParams();

  const [PatchAd] = usePatchAdMutation();

  const {
    data: ad_data,
    isSuccess,
    isLoading,
  } = useGetMyAdQuery(Number(adId.id));

  const [data, setData] = useState<PatchAdSchema>({
    title: ad_data?.title ?? "",
    description: ad_data?.description ?? "",
    price: ad_data?.price ?? "",
    state_id: "",
  });

  if (isLoading) {
    return <div>loding...</div>;
  }

  return (
    <>
      {isSuccess && (
        <div className="myContainer">
          <div className="myFormCard">
            <h1 className="myHead">update ad Page</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await PatchAd({
                  ...data,
                  adId: Number(adId.id),
                });
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
                type="number"
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
              <button type="submit" className="mt-3">
                update ad
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
