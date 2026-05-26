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
    if (isError && error.data.error === "jwt expired") {
      ResetToken();
      window.location.reload();
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex justify-between p-1 bg-surface h-full">
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
        <div className="flex items-center">
          <button
            onClick={() => {
              ResetToken();
              window.location.reload();
            }}
          >
            logout
          </button>
          <Link to="/me" className="bg-transparent inline-block">
            <img
              className="w-8  h-8 object-cover rounded-full "
              src={data.profile_image_path}
              alt=""
            />
          </Link>
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
