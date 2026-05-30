import { Link } from "react-router";
import { useGetAdsQuery } from "../adsApi";
import AdCard from "../../../components/AdCard";
import type { Ad } from "../types";
export default function HomePage() {
  const { data, isSuccess } = useGetAdsQuery();
  return (
    <div>
      <div className="mt-3 flex justify-center gap-2">
        <input type="text" />
        <Link to={""}>ara</Link>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <Link to={""}>ara</Link>
        <Link to={""}>ara</Link>
        <Link to={""}>ara</Link>
        <Link to={""}>ara</Link>
        <Link to={""}>ara</Link>
        <Link to={""}>ara</Link>
        <Link to={""}>ara</Link>
        <Link to={""}>ara</Link>
      </div>

      <div>
        {isSuccess ? (
          <div className="flex  flex-wrap">
            {data?.rows.map((ad: Ad) => {
              return <AdCard key={ad.id} ad={ad} />;
            })}
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
}
