import { GetToken } from "../../../utils/util";
import { useGetMeQuery } from "../userApi";
import { Link } from "react-router";

export default function MePage() {
  const token = GetToken();

  const { data, isSuccess, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {isSuccess && (
        <div>
          <div className="flex flex-row bg-surface p-2">
            <img
              src={data.profile_image_path}
              alt=""
              className="w-1/2 h-50 object-cover rounded-4xl"
            />
            <div className="flex flex-col m-auto text-2xl ">
              <div>
                {data.name} {data.surname}
              </div>
              <div className="text-lg">{data.email}</div>
              <div className="text-lg">{data.phone_number}</div>
              <div className="flex flex-col gap-3 text-lg bg-amber-50">
                <Link to={"edit"}>edit my account</Link>
                <button>delete my account</button>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-wrap">
            {data.rows.map((ad) => {
              return <AdCard key={ad.id} ad={ad}></AdCard>;
            })}
          </div> */}
        </div>
      )}
    </>
  );
}
