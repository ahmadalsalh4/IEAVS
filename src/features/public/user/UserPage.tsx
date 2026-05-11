import { useParams } from "react-router";

export default function UserPage() {
  const userId = useParams();
  console.log(userId);
  return <div>UserPage</div>;
}
