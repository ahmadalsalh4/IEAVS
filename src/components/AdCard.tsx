import { Link } from "react-router";
import type { Ad } from "../features/public/types";
import { MapPin, Calendar } from "lucide-react";

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <Link
      className="text-inherit bg-surface w-40 h-77 m-auto my-3 p-0 hover:opacity-95"
      to={`/ad/${ad.id}`}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <img
        className=" w-full h-50 object-cover rounded-2xl"
        src={ad.image_path}
        alt=""
      />
      <div className="p-2">
        <p className="font-semibold">{ad.price} TL</p>
        <h2>{ad.title}</h2>
        <MapPin size={20} className="inline-block" />
        <p className="inline-block">{ad.city_name}</p> <br />
        <Calendar size={20} className="inline-block" />
        <p className="inline-block"> {ad.date.slice(0, 10)}</p>
      </div>
    </Link>
  );
}
