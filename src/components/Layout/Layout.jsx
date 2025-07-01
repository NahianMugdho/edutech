import React from "react";

import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <div
      className="w-full px-4 mx-auto 
                max-w-[570px]
                sm:max-w-[860px]
                md:max-w-[1024px]
                lg:max-w-[1280px]
               "
    >
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
