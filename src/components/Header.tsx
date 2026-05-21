import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import type { AppDispath, RootState } from "../store";
import { logOut } from "../features/auth/authSlice";

export default function Header() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispath>();
  return (
    <div>
      <Link to="/">IEAVS</Link>{" "}
      {token ? (
        <button
          onClick={() => {
            dispatch(logOut());
          }}
        >
          logout
        </button>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
