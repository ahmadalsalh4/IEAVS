import { Link, useNavigate } from "react-router";
import { GetToken, ResetToken } from "../utils/util";
import { useGetMeQuery } from "../features/protected/userApi";
import { useEffect } from "react";

export default function Header() {
  const token = GetToken();
  const navigate = useNavigate();
  const { data, isSuccess, isError, error, isLoading } = useGetMeQuery(
    undefined,
    {
      skip: !token,
    },
  );
  useEffect(() => {
    if (isError && error.data.error === "invalid token") {
      ResetToken();
      window.location.reload();
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Link
        to="/"
        onClick={() => {
          if (location.pathname === "/") {
            window.location.reload();
          }
        }}
      >
        IEAVS
      </Link>
      {isSuccess ? (
        <div>
          <h3>welcome back</h3>
          <button> my profile {data.email}</button>
          <button
            onClick={() => {
              ResetToken();
              window.location.reload();
            }}
          >
            logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
