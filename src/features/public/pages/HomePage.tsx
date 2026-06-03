import { useGetAdsQuery } from "../adsApi";
import SearchBar from "../../../components/SearchBar";
import Loading from "../../../components/Loading";
import AdsSection from "../../../components/AdsSection";

export default function HomePage() {
  const { data, isSuccess } = useGetAdsQuery();
  return (
    <div>
      <div className="flex justify-center items-center mt-3">
        <SearchBar init=""></SearchBar>
      </div>
      {isSuccess ? (
        <AdsSection ads={data.rows} isProtected={false} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
