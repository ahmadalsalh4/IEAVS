import { useState } from "react";
import { useRegisterMutation } from "../authApi";
import { type RegisterApiSchema } from "../types";
import { useNavigate, Link } from "react-router";
import { SetToken } from "../../../utils/util";

export default function RegisterPage() {
  const [register] = useRegisterMutation();
  const [data, setData] = useState<RegisterApiSchema>({
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="myContainer">
      <div className="myFormCard">
        <h1 className="myHead">RegisterPage</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await register(data);
            if (response.data) {
              SetToken(response.data.token);
              navigate("/");
            } else if (response.error) {
              console.log(response.error);
            }
          }}
        >
          <label htmlFor="name">name: </label>
          <input
            required
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />

          <label htmlFor="surname">surname: </label>
          <input
            required
            id="surname"
            type="text"
            value={data.surname}
            onChange={(e) => {
              setData({ ...data, surname: e.target.value });
            }}
          />

          <label htmlFor="email">email: </label>
          <input
            required
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />

          <label htmlFor="phone_number">phone number: </label>
          <input
            required
            id="phone_number"
            type="number"
            value={data.phone_number}
            onChange={(e) => {
              setData({ ...data, phone_number: e.target.value });
            }}
          />

          <label htmlFor="password">password: </label>
          <input
            required
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />

          <p className="mt-3">
            have account? <Link to={"/login"}>login now</Link>
          </p>
          <div>
            <button className="mt-3" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
