import React from "react";

import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { AdminSlideBar } from "@/components/slidebars";
import { Header } from "@/components/headers";
import useMeStore from "@/zustand/useMeStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminLayout = () => {
  const { me } = useMeStore();
   if(!me?.Role) return  null
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-80px)] bg-stone-100   ">
        <AdminSlideBar />
        <div className="flex-1 overflow-y-hidden p-8 ">
          <Outlet  />

        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
