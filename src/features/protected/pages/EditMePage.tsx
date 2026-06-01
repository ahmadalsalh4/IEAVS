import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetMeQuery, usePatchMeMutation } from "../userApi";
import type { PatchUserSchema } from "../types";
import { GetToken } from "../../../utils/util";

export default function EditMePage() {
  const token = GetToken();

  const {
    data: data_Me,
    isSuccess: isSuccess_Me,
    isLoading: isLoading_Me,
  } = useGetMeQuery(undefined, {
    skip: !token,
  });
  const [PatchUser] = usePatchMeMutation();
  const [data, setData] = useState<PatchUserSchema>({
    name: data_Me?.name ?? "",
    surname: data_Me?.surname ?? "",
    phone_number: data_Me?.phone_number ?? "",
    password: "",
  });
  const navigate = useNavigate();

  if (isLoading_Me) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isSuccess_Me && (
        <div className="myContainer">
          <div className="myFormCard">
            <h1 className="myHead">Update Me Page</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const { password, ...rest } = data;
                const submitData = password === "" ? rest : data;
                const response = await PatchUser(submitData);
                if (response.data) {
                  navigate("/me");
                } else if (response.error) {
                  console.log(response.error);
                }
              }}
            >
              <label htmlFor="name">name: </label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />

              <label htmlFor="surname">surname: </label>
              <input
                id="surname"
                type="text"
                value={data.surname}
                onChange={(e) => {
                  setData({ ...data, surname: e.target.value });
                }}
              />

              <label htmlFor="phone_number">phone number: </label>
              <input
                id="phone_number"
                type="number"
                value={data.phone_number}
                onChange={(e) => {
                  setData({ ...data, phone_number: e.target.value });
                }}
              />

              <label htmlFor="password">password: </label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />

              <div>
                <button className="mt-3" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
