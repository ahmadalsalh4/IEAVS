import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" Component={Layout}>
        <Route index />
        <Route path="search/:name" />
        <Route path="ad/:id" />
        <Route path="user/:id" />
        <Route path="me">
          <Route index />
          <Route path="edit" />
          <Route path="post-ad" />
          <Route path="edit-ad/:id" />
        </Route>
      </Route>
      <Route path="login" />
      <Route path="register" />
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  );
}
