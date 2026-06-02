import { useGetAdsQuery } from "../adsApi";
import AdCard from "../../../components/AdCard";
import type { Ad } from "../types";
import SearchBar from "../../../components/SearchBar";
import Loading from "../../../components/Loading";

export default function HomePage() {
  const { data, isSuccess } = useGetAdsQuery();
  return (
    <div>
      <div className="flex justify-center items-center mt-3">
        <SearchBar init=""></SearchBar>
      </div>
      <div>
        {isSuccess ? (
          <div className="grid grid-cols-2 gap-3 p-3">
            {data?.rows.map((ad: Ad) => {
              return <AdCard key={ad.id} ad={ad} />;
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
