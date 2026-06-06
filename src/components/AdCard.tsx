import { Link } from "react-router";

import { useDeleteAdMutation } from "../features/protected/userApi";
import type { AdCardType } from "../utils/types";

export default function AdCard({
  ad,
  isProtected,
}: {
  ad: AdCardType;
  isProtected: boolean;
}) {
  const [deleteAd] = useDeleteAdMutation();
  return (
    <div className="bg-surface shadow-lg rounded-2xl ">
      <Link
        className="text-black p-0"
        to={isProtected ? `/me/ads/${ad.id}` : `/ad/${ad.id}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img
          className="w-full h-50 object-cover rounded-2xl "
          src={ad.image_path}
          alt=""
        />
        <div className="p-2">
          <p className="font-semibold">{ad.price} TL</p>
          <h2>
            {ad.title.length > 21 ? ad.title.slice(0, 18) + "..." : ad.title}
          </h2>
          <p className="opacity-60">{ad.city_name}</p>
          {isProtected ? (
            <p>
              state:
              <span
                className={
                  ad.state_name == "sold"
                    ? "text-red-500"
                    : ad.state_name == "pending"
                      ? "text-blue-800"
                      : "text-green-700"
                }
              >
                {ad.state_name}
              </span>
            </p>
          ) : null}
        </div>
      </Link>
      {isProtected ? (
        <>
          <Link
            to={`edit-ad/${ad.id}`}
            className="bg-blue-600 ml-2 rounded-2xl p-1.5"
          >
            Edit
          </Link>
          <button
            className="bg-red-700 ml-2 rounded-2xl px-1.5 py-1 mb-2"
            onClick={() => {
              deleteAd(ad.id);
              window.location.reload();
            }}
          >
            Delete
          </button>
        </>
      ) : null}
    </div>
  );
}
