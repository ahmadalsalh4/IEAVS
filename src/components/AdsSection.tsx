import type { Ad } from "../features/public/types";
import AdCard from "./AdCard";

export default function AdsSection({
  ads,
  isProtected,
}: {
  ads: Ad[];
  isProtected: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 p-3">
      {ads.map((ad: Ad) => {
        return <AdCard key={ad.id} ad={ad} isProtected={isProtected} />;
      })}
    </div>
  );
}
