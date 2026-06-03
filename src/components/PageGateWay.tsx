import { Outlet } from "react-router";
import { GetToken } from "../utils/util";

export default function PageGateWay() {
  const token = GetToken();
  if (!token) return <div>this is a protected route! please login first</div>;
  return <Outlet></Outlet>;
}
