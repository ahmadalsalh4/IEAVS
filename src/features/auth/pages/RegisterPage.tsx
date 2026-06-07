import { useState, type ChangeEvent } from "react";
import { useRegisterMutation } from "../authApi";
import { useNavigate, Link } from "react-router";
import { imgToBase64, SetToken } from "../../../utils/util";
import type { RegisterApiSchema } from "../../../utils/types";
import MyError from "../../../components/MyError";

export default function RegisterPage() {
  const [register] = useRegisterMutation();
  const [form, setForm] = useState<RegisterApiSchema>({
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    password: "",
    profile_image_path: "",
  });

  async function handleImgSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const base64Img = await imgToBase64(e.target.files[0]);
      setForm({ ...form, profile_image_path: base64Img });
    }
  }
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="myContainer">
      <div className="myFormCard">
        <h1 className="myHead">RegisterPage</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { data, error } = await register(form);
            if (data) {
              SetToken(data.token);
              navigate("/");
            } else if (error) {
              setErrorMessage(error.data.error);
            }
          }}
        >
          <label htmlFor="name">name: </label>
          <input
            required
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />

          <label htmlFor="surname">surname: </label>
          <input
            required
            id="surname"
            type="text"
            value={form.surname}
            onChange={(e) => {
              setForm({ ...form, surname: e.target.value });
            }}
          />

          <label htmlFor="email">email: </label>
          <input
            required
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />

          <label htmlFor="phone_number">phone number: </label>
          <input
            required
            id="phone_number"
            type="number"
            value={form.phone_number}
            onChange={(e) => {
              setForm({ ...form, phone_number: e.target.value });
            }}
          />

          <label htmlFor="password">password: </label>
          <input
            required
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
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

          <p className="mt-3">
            have account? <Link to={"/login"}>login now</Link>
          </p>
          <div>
            <MyError errorMessage={errorMessage}></MyError>
            <button className="mt-3" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
