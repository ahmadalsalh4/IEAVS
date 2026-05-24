import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <div className="h-10">
        <Header></Header>
      </div>
      <div className="min-h-[calc(100vh-120px)]">
        <Outlet></Outlet>
      </div>
      <div className="h-20">
        <Footer></Footer>
      </div>
    </div>
  );
}
