import { Link } from "react-router";
import type { Ad } from "../features/public/types";

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <Link
      className="bg-surface h-70 rounded-2xl shadow-lg"
      to={`/ad/${ad.id}`}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <img
        className="w-full h-50 object-cover rounded-2xl"
        src={ad.image_path}
        alt=""
      />
      <div className="p-2">
        <p className="font-semibold">{ad.price} TL</p>
        <h2>
          {ad.title.length > 21 ? ad.title.slice(0, 18) + "..." : ad.title}
        </h2>
        <p className="opacity-60">{ad.city_name}</p>
      </div>
    </Link>
  );
}
