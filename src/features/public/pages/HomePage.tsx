import { useGetAdsQuery } from "../adsApi";
import AdCard from "../../../components/AdCard";
import type { Ad } from "../types";
import SearchBar from "../../../components/SearchBar";
import Loading from "../../../components/Loading";

export default function HomePage() {
  const { data, isSuccess } = useGetAdsQuery();
  return (
    <div className="">
      <div className="flex justify-center items-center mt-3">
        <SearchBar init=""></SearchBar>
      </div>
      <p className="myHead mt-3">Son Eklenen Ilanlar</p>
      <div>
        {isSuccess ? (
          <div className="flex flex-wrap">
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
