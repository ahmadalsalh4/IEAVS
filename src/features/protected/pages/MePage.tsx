import Loading from "../../../components/Loading";
import { GetToken, ResetToken } from "../../../utils/util";
import {
  useDeleteMeMutation,
  useGetMeQuery,
  useGetMyAdsQuery,
} from "../userApi";
import { Link, useNavigate } from "react-router";
import AdCard from "../../../components/AdCard";

export default function MePage() {
  const token = GetToken();
  const navigate = useNavigate();

  const {
    data: data_Me,
    isSuccess: isSuccess_Me,
    isLoading: isLoading_Me,
  } = useGetMeQuery(undefined, {
    skip: !token,
  });
  const {
    data: data_MyAds,
    isSuccess: isSuccess_MyAds,
    isLoading: isLoading_MyAds,
  } = useGetMyAdsQuery(undefined, {
    skip: !token,
  });
  const [deleteMe] = useDeleteMeMutation();
  function handleDeleteAcc() {
    deleteMe();
    ResetToken();
    navigate("/");
    window.location.reload();
  }
  if (isLoading_Me || isLoading_MyAds) {
    return <Loading />;
  }
  return (
    <>
      {isSuccess_Me && isSuccess_MyAds && (
        <div>
          <div className="flex flex-row bg-surface p-2">
            <img
              src={data_Me.profile_image_path}
              alt=""
              className="w-1/2 h-50 object-cover rounded-4xl"
            />
            <div className="flex flex-col m-auto text-2xl ">
              <div>
                {data_Me.name} {data_Me.surname}
              </div>
              <div className="text-lg">{data_Me.email}</div>
              <div className="text-lg">{data_Me.phone_number}</div>
              <div className="flex flex-col gap-3 text-lg">
                <Link to={"edit"}>edit my account</Link>
                <button disabled onClick={handleDeleteAcc}>
                  delete my account
                </button>
                <Link to={"post-ad"} className="">
                  add new Ad{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 p-3">
            {data_MyAds.rows.map((ad) => {
              return <AdCard key={ad.id} ad={ad} isProtected={true}></AdCard>;
            })}
          </div>
        </div>
      )}
    </>
  );
}
