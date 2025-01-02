import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="p-0 max-w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
