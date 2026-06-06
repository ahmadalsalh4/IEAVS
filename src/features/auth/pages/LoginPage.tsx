import { useNavigate, Link } from "react-router";

import { useState } from "react";
import { useLogInMutation } from "../authApi";
import { SetToken } from "../../../utils/util";
import type { LoginApiSchema } from "../../../utils/types";
import MyError from "../../../components/MyError";

export default function LoginPage() {
  const [Login] = useLogInMutation();
  const [form, setForm] = useState<LoginApiSchema>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="myContainer">
      <div className="myFormCard">
        <h1 className="myHead ">Login Page</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { data, error } = await Login(form);
            if (data) {
              SetToken(data.token);
              navigate("/");
            } else if (error) {
              setErrorMessage(error.data.error);
            }
          }}
        >
          <label htmlFor="Email">Email: </label>
          <input
            type="email"
            id="Email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />{" "}
          <label htmlFor="Password">Password: </label>
          <input
            type="password"
            id="Password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <p className="mt-3">
            dont have account? <Link to={"/register"}>register now</Link>
          </p>
          <MyError errorMessage={errorMessage}></MyError>
          <button type="submit" className="mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
