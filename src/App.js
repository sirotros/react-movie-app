import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from "components/Header/Header";
import Home from "pages/Home";
import Detail from "pages/Detail";
import Popular from "pages/Popular";
import TopRated from "pages/TopRated";
import ErrorPage from "pages/ErrorPage";
import ProfileDetail from "pages/ProfileDetail";


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
    <main className="container z-n1">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="popular" element={<Popular />} />
          <Route path="top_rated" element={<TopRated />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="profile/:id" element={<ProfileDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
