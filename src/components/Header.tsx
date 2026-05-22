import { Link, useNavigate } from "react-router";
import { GetToken, ResetToken } from "../utils/util";
import { useGetMeQuery } from "../features/protected/userApi";

export default function Header() {
  const token = GetToken();
  console.log("re rendered");

  const { data, isSuccess } = useGetMeQuery(undefined, {
    skip: !token,
  });
const navigate = useNavigate();
  // if (isError) {
  //   console.log(error);
  //   ResetToken();
  //   navigate("/");
  // }

  
  return (
    <div>
      {token}
      <Link to="/">IEAVS</Link>{" "}
      {token && isSuccess ? (
        <div>
          <h3>
            welcome back {data.email} ,, {token}
          </h3>

          <button
            onClick={() => {
              ResetToken();
              navigate("/");
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
