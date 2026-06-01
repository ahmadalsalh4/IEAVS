import { Link } from "react-router";
import { MapPin, Calendar } from "lucide-react";
import type { MyAd } from "../features/protected/types";
import { useDeleteAdMutation } from "../features/protected/userApi";

export default function MyAdCard({ ad }: { ad: MyAd }) {
  const [deleteAd] = useDeleteAdMutation();
  return (
    <div className="bg-surface w-40 h-92 m-auto my-3 p-0 hover:opacity-95">
      <Link
        className="text-inherit p-0"
        to={`ads/${ad.id}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img
          className=" w-full h-50 object-cover rounded-2xl "
          src={ad.image_path}
          alt=""
        />
        <div className="p-2">
          <p className="font-semibold">{ad.price} TL</p>
          <h2>
            {ad.title.length > 21 ? ad.title.slice(0, 18) + "..." : ad.title}
          </h2>
          <MapPin size={20} className="inline-block" />
          <p className="inline-block">{ad.city_name}</p> <br />
          <Calendar size={20} className="inline-block" />
          <p className="inline-block"> {ad.date.slice(0, 10)}</p>
          <p
            className={
              ad.state_name == "sold"
                ? "text-red-500"
                : ad.state_name == "pending"
                  ? "text-blue-800"
                  : "text-green-700"
            }
          >
            state: {ad.state_name}
          </p>
        </div>
      </Link>
      <Link to={`edit-ad/${ad.id}`} className="ml-1.5">
        Edit AD
      </Link>
      <button
        className="bg-red-800 py-0.5 px-0.5 ml-1"
        onClick={() => {
          deleteAd(ad.id);
          window.location.reload();
        }}
      >
        Delete ad
      </button>
    </div>
  );
}
