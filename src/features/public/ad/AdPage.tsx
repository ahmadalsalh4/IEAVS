import { useParams } from "react-router";

export default function AdPage() {
  const adId = useParams();
  console.log(adId);
  return <div>AdPage</div>;
}
