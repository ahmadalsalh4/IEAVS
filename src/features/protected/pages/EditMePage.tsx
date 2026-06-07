import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useGetMeQuery, usePatchMeMutation } from "../userApi";
import Loading from "../../../components/Loading";
import MyError from "../../../components/MyError";
import type { PatchUserSchema } from "../../../utils/types";
import { imgToBase64 } from "../../../utils/util";

export default function EditMePage() {
  const navigate = useNavigate();

  const [PatchUser] = usePatchMeMutation();

  const { data: me, isSuccess, isLoading } = useGetMeQuery();

  const [form, setForm] = useState<PatchUserSchema>({
    name: "",
    surname: "",
    phone_number: "",
    password: "",
    profile_image_path: "",
  });

  async function handleImgSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const base64Img = await imgToBase64(e.target.files[0]);
      setForm({ ...form, profile_image_path: base64Img });
    }
  }
  const [fillForm, setFillForm] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (isSuccess && fillForm) {
    setFillForm(false);
    setForm({
      name: me.name,
      surname: me.surname,
      phone_number: me.phone_number,
      password: "",
      profile_image_path: me.profile_image_path,
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
            <h1 className="myHead">Update Me Page</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const { password, ...rest } = form;
                const submitData = password === "" ? rest : form;
                const { data, error } = await PatchUser(submitData);
                if (data) {
                  navigate("/me");
                } else {
                  setErrorMessage(error.data.error);
                }
              }}
            >
              <label htmlFor="name">name: </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
              <label htmlFor="surname">surname: </label>
              <input
                id="surname"
                type="text"
                value={form.surname}
                onChange={(e) => {
                  setForm({ ...form, surname: e.target.value });
                }}
              />
              <label htmlFor="phone_number">phone number: </label>
              <input
                id="phone_number"
                type="number"
                value={form.phone_number}
                onChange={(e) => {
                  setForm({ ...form, phone_number: e.target.value });
                }}
              />
              <label htmlFor="password">password: </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />{" "}
              <label htmlFor="profile_image_path">profile image: </label>
              <input
                id="profile_image_path"
                type="file"
                onChange={handleImgSelect}
              />
              {form.profile_image_path && (
                <img
                  src={form.profile_image_path}
                  className="p-1 rounded-full w-40 h-40 object-cover"
                />
              )}
              <MyError errorMessage={errorMessage}></MyError>
              <button className="mt-3" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
