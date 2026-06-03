import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetMeQuery, usePatchMeMutation } from "../protectedApi";
import type { PatchUserSchema } from "../types";
import Loading from "../../../components/Loading";
import MyError from "../../../components/MyError";

export default function EditMePage() {
  const navigate = useNavigate();

  const [PatchUser] = usePatchMeMutation();

  const { data: me, isSuccess, isLoading } = useGetMeQuery();

  const [form, setForm] = useState<PatchUserSchema>({
    name: "",
    surname: "",
    phone_number: "",
    password: "",
  });

  const [fillForm, setFillForm] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (isSuccess && fillForm) {
    setFillForm(false);
    setForm({
      name: me.name,
      surname: me.surname,
      phone_number: me.phone_number,
      password: "",
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
              />
              <MyError errorMessage={errorMessage}></MyError>

              <button className="mt-3 bg-amber-50" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
