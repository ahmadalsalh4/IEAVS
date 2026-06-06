import { Link, useNavigate } from "react-router";
import { GetToken, ResetToken } from "../utils/util";
import { useGetMeQuery } from "../features/protected/userApi";
import Loading from "./Loading";

export default function Header() {
  const token = GetToken();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between p-1 bg-surface h-full md:rounded-t-2xl ">
      <Link
        className="self-center"
        to="/"
        onClick={() => {
          if (location.pathname === "/") {
            window.location.reload();
          }
        }}
      >
        IEAVS
      </Link>
      {isSuccess && token ? (
        <div className="flex items-center">
          <button
            className="mr-1"
            onClick={() => {
              ResetToken();
              navigate("/");
              window.location.reload();
            }}
          >
            logout
          </button>
          <Link to="/me" className="bg-transparent inline-block ">
            <img
              className="w-8  h-8 object-cover rounded-full "
              src={data.profile_image_path}
              alt=""
            />
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Link to="/register" className="mx-2">
            Register
          </Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
