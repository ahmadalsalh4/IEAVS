import { useParams } from "react-router";

export default function EditAdPage() {
  const AdId = useParams();
  console.log(AdId);
  return <div>EditAdPage</div>;
}
