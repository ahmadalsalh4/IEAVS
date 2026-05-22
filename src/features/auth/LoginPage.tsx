import { useNavigate } from "react-router";
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
    <div className="flex justify-center items-center h-screen bg-blue-600 ">
      <div className="bg-white w-2/3 mb-50 h-fit rounded-2xl p-3 flex flex-col">
        <div className="text-xl text-center">Login Page</div>
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
          <div className="flex justify-center">
            <button
              className="rounded-xl text-white bg-primary mt-3 p-2 w-fit "
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
