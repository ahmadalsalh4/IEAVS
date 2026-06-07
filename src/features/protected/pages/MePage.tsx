import Loading from "../../../components/Loading";
import { GetToken, ResetToken } from "../../../utils/util";
import {
  useDeleteMeMutation,
  useGetMeQuery,
  useGetMyAdsQuery,
} from "../userApi";
import { Link, useNavigate } from "react-router";
import AdsSection from "../../../components/AdsSection";

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
          <div className="flex flex-col">
            <div className="grid grid-cols-2 bg-surface p-2 ">
              <div className="">
                <img
                  src={data_Me.profile_image_path}
                  alt=""
                  className="h-50 object-cover rounded-4xl md:w-2/5 md:mx-auto "
                />
              </div>
              <div className="grid ">
                <div className="flex flex-col text-lg justify-center items-center">
                  <div>
                    {data_Me.name} {data_Me.surname}
                  </div>
                  <div className="">{data_Me.email}</div>
                  <div className="">{data_Me.phone_number}</div>
                </div>

                <div className="flex flex-col justify-around text-center">
                  <Link to={"edit"}>edit my account</Link>
                  <button
                    disabled
                    onClick={handleDeleteAcc}
                    className="bg-red-700"
                  >
                    delete my account
                  </button>
                </div>
              </div>
            </div>
            <Link to={"post-ad"} className="text-center">
              add new Ad
            </Link>
          </div>

          <AdsSection ads={data_MyAds.rows} isProtected={true} />
        </div>
      )}
    </>
  );
}
