import type { Ad } from "../types";

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <div>
      {ad.title} <img className="w-20" src={ad.image_path} alt="" />
    </div>
  );
}
