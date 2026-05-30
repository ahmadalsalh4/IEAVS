import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./features/public/home/HomePage";
import RegisterPage from "./features/auth/RegisterPage";
import LoginPage from "./features/auth/LoginPage";
import SearchPage from "./features/public/search/SearchPage";
import AdPage from "./features/public/ad/AdPage";
import UserPage from "./features/public/user/UserPage";
import MePage from "./features/protected/MePage";
import EditMePage from "./features/protected/EditMePage";
import PostAdPage from "./features/protected/PostAdPage";
import EditAdPage from "./features/protected/EditAdPage";

export default function App() {
  return (
    <div className="myApp">
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index Component={HomePage} />
          <Route path="search/:name" Component={SearchPage} />
          <Route path="ad/:id" Component={AdPage} />
          <Route path="user/:id" Component={UserPage} />
          <Route path="me">
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
