import { useParams } from "react-router";

export default function SearchPage() {
  const x = useParams();
  console.log(x);
  return <div>SearchPage </div>;
}
