import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useGetMyAdQuery, usePatchAdMutation } from "../userApi";
import Loading from "../../../components/Loading";
import MyError from "../../../components/MyError";
import type { PatchAdSchema } from "../../../utils/types";

export default function EditAdPage() {
  const adId = Number(useParams<{ id: string }>().id);

  const navigate = useNavigate();

  const [PatchAd] = usePatchAdMutation();

  const { data: ad, isSuccess, isLoading } = useGetMyAdQuery(adId);

  const [form, setForm] = useState<PatchAdSchema>({
    title: "",
    description: "",
    price: "",
  });
  const [fillForm, setFillForm] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (isSuccess && fillForm) {
    setFillForm(false);
    setForm({
      title: ad.title,
      description: ad.description,
      price: ad.price,
    });
  }

  if (isLoading) {
    return <Loading />;
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
                const { data, error } = await PatchAd({
                  ...form,
                  adId: adId,
                });
                if (data) {
                  navigate("/me");
                } else {
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
                type="number"
                min={1}
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
              <MyError errorMessage={errorMessage}></MyError>
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
