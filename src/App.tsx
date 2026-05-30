import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./features/public/pages/HomePage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import SearchPage from "./features/public/pages/SearchPage";
import AdPage from "./features/public/pages/AdPage";
import UserPage from "./features/public/pages/UserPage";
import MePage from "./features/protected/pages/MePage";
import EditMePage from "./features/protected/pages/EditMePage";
import PostAdPage from "./features/protected/pages/PostAdPage";
import EditAdPage from "./features/protected/pages/EditAdPage";
import PageGateWay from "./features/protected/pages/PageGateWay";

export default function App() {
  return (
    <div className="myApp">
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index Component={HomePage} />
          <Route path="search/:name" Component={SearchPage} />
          <Route path="ad/:id" Component={AdPage} />
          <Route path="user/:id" Component={UserPage} />
          <Route path="me" Component={PageGateWay}>
            <Route index Component={MePage} />
            <Route path="edit" Component={EditMePage} />
            <Route path="post-ad" Component={PostAdPage} />
            <Route path="edit-ad/:id" Component={EditAdPage} />
          </Route>
          <Route path="*" Component={NotFoundPage} />
        </Route>
        <Route path="login" Component={LoginPage} />
        <Route path="register" Component={RegisterPage} />
      </Routes>
    </div>
  );
}
