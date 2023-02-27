import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from "components/Header/Header";
import ApiKey from "pages/ApiKey";
import Home from "pages/Home";
import Detail from "pages/Detail";
import Popular from "pages/Popular";
import TopRated from "pages/TopRated";
import ErrorPage from "pages/ErrorPage";
import ProfileDetail from "pages/ProfileDetail";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";


function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}


function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="popular" element={<PrivateRoute><Popular /></PrivateRoute>} />
          <Route path="top_rated" element={<PrivateRoute><TopRated /></PrivateRoute>} />
          <Route path="api_key" element={<ApiKey />} />
          <Route path="detail/:id" element={<PrivateRoute><Detail /></PrivateRoute>} />
          <Route path="profile/:id" element={<PrivateRoute><ProfileDetail /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><ErrorPage /></PrivateRoute>} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
