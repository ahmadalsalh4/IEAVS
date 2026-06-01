import { useParams } from "react-router";
import { MapPin, Calendar } from "lucide-react";
import { useGetMyAdQuery } from "../userApi";
export default function MyAdPage() {
  const adId = useParams();
  const {
    data: ad,
    isSuccess: ad_suc,
    isLoading: ad_lod,
  } = useGetMyAdQuery(Number(adId.id));

  if (ad_lod) {
    return <div>loding...</div>;
  }

  return (
    <>
      {ad_suc && (
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
          </div>
        </div>
      )}
    </>
  );
}
//
