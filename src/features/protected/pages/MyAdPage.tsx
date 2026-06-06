import { useParams } from "react-router";
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
          <div className="md:flex">
            <img
              src={ad.image_path}
              alt=""
              className="md:h-120 md:w-1/2 md:object-contain md:m-1"
            />
            <div className="p-2 ">
              <h2 className="text-xl">{ad.title}</h2>
              <p className=" text-lg">{ad.price} TL</p>
              <p>{ad.city_name}</p>
              <p> {ad.date.slice(0, 10)}</p>
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
