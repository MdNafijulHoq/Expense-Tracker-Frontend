import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ComponentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1 mx-auto mt-4 mb-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ComponentLayout;
