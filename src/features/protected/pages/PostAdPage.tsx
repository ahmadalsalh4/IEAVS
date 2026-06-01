import { useNavigate, Link } from "react-router";

import { useState } from "react";

import { SetToken } from "../../../utils/util";
import { useLogInMutation } from "../../auth/authApi";
import type { LoginApiSchema } from "../../auth/types";

export default function PostAdPage() {
  const [Login] = useLogInMutation();
  const [data, setData] = useState<LoginApiSchema>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="myContainer">
      <div className="myFormCard">
        <h1 className="myHead ">Add Post Page</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await Login(data);
            if (response.data) {
              SetToken(response.data.token);
              navigate("/");
            } else if (response.error) {
              console.log(response.error);
            }
          }}
        >
          <label htmlFor="Email">Email: </label>
          <input
            type="email"
            id="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          <label htmlFor="Email">Email: </label>
          <input
            type="email"
            id="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          <label htmlFor="Email">Email: </label>
          <input
            type="email"
            id="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          <label htmlFor="Email">Email: </label>
          <input
            type="email"
            id="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          <label htmlFor="Password">Password: </label>
          <input
            type="password"
            id="Password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
          <p className="mt-3">
            dont have account? <Link to={"/register"}>register now</Link>
          </p>
          <button type="submit" className="mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
