import { Link } from "react-router";
import { MapPin, Calendar } from "lucide-react";
import type { MyAd } from "../features/protected/types";

export default function MyAdCard({ ad }: { ad: MyAd }) {
  return (
    <Link
      className="text-inherit bg-surface w-40 h-100 m-auto my-3 p-0 hover:opacity-95"
      to={`ads/${ad.id}`}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <img
        className=" w-full h-50 object-cover rounded-2xl bg-amber-50 "
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
        <p
          className={
            ad.state_name == "sold"
              ? "text-red-400"
              : ad.state_name == "pending"
                ? "text-amber-300"
                : "text-green-400"
          }
        >
          state: {ad.state_name}
        </p>
      </div>
    </Link>
  );
}
