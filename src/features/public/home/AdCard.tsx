import type { Ad } from "../types";
import { MapPin, Calendar } from "lucide-react";

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <div className="bg-surface w-40 h-77 m-auto my-3 rounded-2xl">
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
      </div>
    </div>
  );
}
