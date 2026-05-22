import { useState } from "react";
import { useRegisterMutation } from "./authApi";
import { type RegisterApiSchema } from "./types";
import { useNavigate } from "react-router";
import { SetToken } from "../../utils/util";

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
    <div>
      <h1>RegisterPage</h1>
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
        <div>
          {" "}
          <label htmlFor="name">name: </label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="surname">surname: </label>
          <input
            id="surname"
            type="text"
            value={data.surname}
            onChange={(e) => {
              setData({ ...data, surname: e.target.value });
            }}
          />
        </div>

        <div>
          <label htmlFor="email">email: </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="phone_number">phone number: </label>
          <input
            id="phone_number"
            type="number"
            value={data.phone_number}
            onChange={(e) => {
              setData({ ...data, phone_number: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
