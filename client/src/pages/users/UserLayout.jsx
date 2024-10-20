import { Navigate, Outlet } from "react-router-dom";

import useMeStore from "@/zustand/useMeStore";
import { toast } from "sonner";
import { UseSlideBar } from "@/components/slidebars";
import { Header } from "@/components/headers";

const UserLayOut = () => {
  const { me } = useMeStore();
  if (!me) {
    toast.info("You must be logged in");

    return <Navigate to="/" />;
  }

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-96px)] bg-stone-100  ">
        <div className="w-[256px]  h-full flex-none">
          <UseSlideBar />
        </div>
        <div className="flex-auto py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayOut;
//
