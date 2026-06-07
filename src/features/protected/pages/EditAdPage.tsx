import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, type ChangeEvent } from "react";
import { useGetMyAdQuery, usePatchAdMutation } from "../userApi";
import Loading from "../../../components/Loading";
import MyError from "../../../components/MyError";
import type { PatchAdSchema } from "../../../utils/types";
import { getCategoryId, imgToBase64 } from "../../../utils/util";
import LoadCategories from "../../../utils/LoadCategories";
// import LoadCities from "../../../utils/LoadCities";

export default function EditAdPage() {
  const adId = Number(useParams<{ id: string }>().id);

  const navigate = useNavigate();

  const [PatchAd] = usePatchAdMutation();

  const { data: ad, isSuccess, isLoading } = useGetMyAdQuery(adId);
  async function handleImgSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const base64Img = await imgToBase64(e.target.files[0]);
      setForm({ ...form, image_path: base64Img });
    }
  }
  const [form, setForm] = useState<PatchAdSchema>({
    title: "",
    description: "",
    price: "",
    image_path: "",
    category_id: "",
  });
  const [fillForm, setFillForm] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (isSuccess && fillForm) {
    console.log(getCategoryId(ad.category_name));
    setFillForm(false);
    setForm({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      image_path: ad.image_path,
      category_id: getCategoryId(ad.category_name),
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
                console.log(form);
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
              <select
                id="category_id"
                value={form.category_id}
                onChange={(e) => {
                  setForm({ ...form, category_id: e.target.value });
                }}
              >
                <LoadCategories />
              </select>
              {/* <select
                id="city_id"
                value={form.city_id}
                onChange={(e) => {
                  setForm({ ...form, city_id: e.target.value });
                }}
              >
                <LoadCities />
              </select> */}
              <label htmlFor="image_path">ad image: </label>
              <input id="image_path" type="file" onChange={handleImgSelect} />
              {form.image_path && (
                <img src={form.image_path} className="p-1 w-2/5" />
              )}
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
