import { Link, useParams } from "react-router";
import {
  useGetAdQuery,
  useGetAdsByCatagoryQuery,
  useGetAdsByUserQuery,
} from "../adsApi";
import { MapPin, Calendar } from "lucide-react";
import AdCard from "../../../components/AdCard";
export default function AdPage() {
  const adId = useParams();
  const {
    data: ad,
    isSuccess: ad_suc,
    isLoading: ad_lod,
  } = useGetAdQuery(Number(adId.id));
  const {
    data: user,
    isSuccess: user_suc,
    isLoading: user_lod,
  } = useGetAdsByUserQuery(Number(ad?.user_id), { skip: !ad });

  const {
    data: suggestedAds,
    isSuccess: suggestedAds_suc,
    isLoading: suggestedAds_lod,
  } = useGetAdsByCatagoryQuery(ad?.category_name || "", {
    skip: !ad?.category_name,
  });

  if (ad_lod || user_lod || suggestedAds_lod) {
    return <div>loding...</div>;
  }

  return (
    <>
      {ad_suc && user_suc && suggestedAds_suc && (
        <div>
          <div>
            <img src={ad.image_path} alt="" />
            <div className="p-2 ">
              <h2 className="text-2xl font-semibold">{ad.title}</h2>
              <p className="font-semibold text-xl">{ad.price} TL</p>
              <MapPin size={20} className="inline-block" />
              <p className="inline-block">{ad.city_name}</p> <br />
              <Calendar size={20} className="inline-block" />
              <p className="inline-block"> {ad.date.slice(0, 10)}</p>
              <div>
                aciklama : <span className="text-m">{ad.description}</span>
              </div>
            </div>
            <Link
              to={`/user/${ad.user_id}`}
              className="bg-surface h-15 flex items-center gap-3 p-3 rounded-2xl text-inherit hover:opacity-95"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={user?.userdata.profile_image_path}
                alt=""
                className="h-15 w-15 object-cover rounded-full"
              />
              <div className="flex flex-col text-xl font-semibold">
                <span>
                  {user.userdata.name} {user.userdata.surname}
                </span>
                <span>{user.userdata.phone_number}</span>
              </div>
            </Link>
            <div>
              <p className="text-3xl m-4">ilgili ilanlar:</p>
              <div className="flex flex-wrap">
                {suggestedAds.rows.map((subAd) => {
                  return ad.id == subAd.id ? null : (
                    <AdCard
                      key={subAd.id}
                      ad={subAd}
                      isProtected={false}
                    ></AdCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
//
