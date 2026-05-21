import { Link, useNavigate } from "react-router";
import { GetToken, ResetToken } from "../utils/util";

export default function Header() {
  const token = GetToken();
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/">IEAVS</Link>{" "}
      {token ? (
        <div>
          <h3>welcome back {token}</h3>
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
