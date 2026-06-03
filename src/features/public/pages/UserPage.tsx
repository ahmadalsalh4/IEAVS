import { useParams } from "react-router";
import { useGetAdsByUserQuery } from "../publicApi";
import AdCard from "../../../components/AdCard";

export default function UserPage() {
  const userId = useParams();
  const { data, isSuccess, isLoading } = useGetAdsByUserQuery(
    Number(userId.id),
  );
  if (isLoading) {
    return <div>Loding...</div>;
  }

  return (
    <>
      {isSuccess && (
        <div>
          <div className="flex flex-row bg-surface p-2">
            <img
              src={data.userdata.profile_image_path}
              alt=""
              className="w-1/2 h-50 object-cover rounded-4xl"
            />
            <div className="flex flex-col m-auto text-2xl">
              <div>
                {data.userdata.name} {data.userdata.surname}
              </div>
              <div>{data.userdata.phone_number}</div>
            </div>
          </div>
          <div className="flex flex-wrap">
            {data.rows.map((ad) => {
              return <AdCard key={ad.id} ad={ad}></AdCard>;
            })}
          </div>
        </div>
      )}
    </>
  );
}
