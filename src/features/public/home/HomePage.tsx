import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

export default function HomePage() {
  const auth = useSelector((state: RootState) => state.auth.token);
  return (
    <div>
      HomePage
      <span>welcome back {auth}</span>
    </div>
  );
}
