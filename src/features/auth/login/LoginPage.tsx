import { useNavigate } from "react-router";
import { type LoginSchema } from "../types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispath } from "../../../store";
import { setToken } from "../authSlice";
import { useLogInMutation } from "../authApis";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispath>();
  const [Login] = useLogInMutation();
  const [cdata, setData] = useState<LoginSchema>({
    email: "",
    password: "",
  });
  const navogate = useNavigate();

  return (
    <div>
      Login Page
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await Login(cdata);
          console.log(response);
          if (response.data) {
            dispatch(setToken(response.data.token));
            navogate("/");
          } else if (response.error) {
            console.log(response.error);
          }
        }}
      >
        <label htmlFor="Email">Email: </label>
        <input
          type="text"
          id="Email"
          value={cdata.email}
          onChange={(e) => {
            setData({ ...cdata, email: e.target.value });
          }}
        />
        <label htmlFor="Password">Password: </label>
        <input
          type="text"
          id="Password"
          value={cdata.password}
          onChange={(e) => {
            setData({ ...cdata, password: e.target.value });
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
