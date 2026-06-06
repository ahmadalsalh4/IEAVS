import type { AdCardType } from "../utils/types";
import AdCard from "./AdCard";

export default function AdsSection({
  ads,
  isProtected,
}: {
  ads: AdCardType[];
  isProtected: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-3 lg:grid-cols-4">
      {ads.map((ad: AdCardType) => {
        return <AdCard key={ad.id} ad={ad} isProtected={isProtected} />;
      })}
    </div>
  );
}
