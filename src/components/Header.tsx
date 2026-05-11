import { Link } from "react-router";

export default function Header() {
  return (
    <div>
      <Link to="/">IEAVS</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}
