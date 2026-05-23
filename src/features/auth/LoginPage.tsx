import { useNavigate, Link } from "react-router";
import { type LoginApiSchema } from "./types";
import { useState } from "react";
import { useLogInMutation } from "./authApi";
import { SetToken } from "../../utils/util";

export default function LoginPage() {
  const [Login] = useLogInMutation();
  const [data, setData] = useState<LoginApiSchema>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="myContainer">
      <div className="w-2/3 mb-50 rounded-3xl p-3 bg-surface ">
        <h1 className="myHead ">Login Page</h1>
        <form
          className="flex flex-col"
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
          />{" "}
          <label htmlFor="Password">Password: </label>
          <input
            type="password"
            id="Password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
          <div className="mt-3">
            <p>
              dont have account? <Link to={"/register"}>register now</Link>
            </p>
          </div>
          <button type="submit" className="mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
