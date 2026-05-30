import { Outlet } from "react-router";
import { GetToken, ResetToken } from "../../../utils/util";
import { Link, useNavigate } from "react-router";

import { useEffect } from "react";
import { useGetMeQuery } from "../userApi";

export default function PageGateWay() {
  const token = GetToken();
  const navigate = useNavigate();
  const { data, isSuccess, isError, error, isLoading } = useGetMeQuery(
    undefined,
    {
      skip: !token,
    },
  );
  useEffect(() => {
    if (isError && error.data.error === "jwt expired") {
      ResetToken();
      window.location.reload();
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!token) return <div>this is a protected route! plees login first</div>;
  return <Outlet></Outlet>;
}
