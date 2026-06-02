import { useParams } from "react-router";
import SearchBar from "../../../components/SearchBar";
import type { Ad } from "../types";
import { useGetAdBySearchQuery } from "../adsApi";
import AdCard from "../../../components/AdCard";
import Loading from "../../../components/Loading";

export default function SearchPage() {
  const Word = useParams();
  const { data, isSuccess, isError } = useGetAdBySearchQuery(Word.name || "", {
    skip: !Word,
  });
  if (isError) {
    return (
      <>
        <div className="mt-3 flex justify-center gap-2">
          <SearchBar init={Word.name || ""}></SearchBar>
        </div>
        <div className="text-2xl text-center">ilan bulunmadi</div>
      </>
    );
  }
  return (
    <div>
      <div className="mt-3 flex justify-center gap-2">
        <SearchBar init={Word.name || ""}></SearchBar>
      </div>
      <div>
        {isSuccess ? (
          <>
            <p className="text-center mt-3 text-2xl">
              {data.rowCount} ilan bulundu
            </p>
            <div className="flex flex-wrap">
              {data?.rows.map((ad: Ad) => {
                return <AdCard key={ad.id} ad={ad} />;
              })}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
