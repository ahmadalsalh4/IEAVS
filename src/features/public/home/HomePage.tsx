import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

export default function HomePage() {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <div>
      HomePage
      <span>welcome back {token}</span>
    </div>
  );
}
