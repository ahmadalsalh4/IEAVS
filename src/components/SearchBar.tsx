import { useState } from "react";
import { Link, useNavigate } from "react-router";
export default function SearchBar({ init }: { init: string }) {
  const [search, setSearch] = useState(init);
  const navigate = useNavigate();

  return (
    <div>
      <input
      className="border-stone-700"
        type="text"
        value={search}
        placeholder="pense,kalem, yada baska sey!"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search !== "") navigate(`/search/${search}`);
        }}
      />
      <Link
        to={`/search/${search}`}
        className={"ml-3  px-6 py-2 " + (search ? "" : "pointer-events-none")}
      >
        ara
      </Link>
    </div>
  );
}
