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
    <div className="flex justify-between items-center p-1 bg-surface h-full">
      <Link
        to="/"
        onClick={() => {
          if (location.pathname === "/") {
            window.location.reload();
          }
        }}
        className=""
      >
        IEAVS
      </Link>
      {isSuccess ? (
        <div>
          <button
            onClick={() => {
              ResetToken();
              window.location.reload();
            }}
            className="mx-2"
          >
            logout
          </button>
          <Link to="/me">my profile</Link>
        </div>
      ) : (
        <div>
          <Link to="/register" className="mx-2">
            Register
          </Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
