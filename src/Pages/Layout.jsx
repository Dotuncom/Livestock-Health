//src/Pages/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Layout() {
  console.log("first");
  const xml = (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
  return xml;
}

export default Layout;
