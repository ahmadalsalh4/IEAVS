import { useGetAdsQuery } from "../adsApi";
import AdCard from "../../../components/AdCard";
import type { Ad } from "../types";
import SearchBar from "../../../components/SearchBar";

export default function HomePage() {
  const { data, isSuccess } = useGetAdsQuery();
  return (
    <div>
      <div className="mt-3 flex justify-center gap-2">
        <SearchBar init=""></SearchBar>
      </div>
      <p className="text-center mt-3 text-2xl">Son Eklenen Ilanlar</p>
      <div>
        {isSuccess ? (
          <div className="flex flex-wrap">
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
