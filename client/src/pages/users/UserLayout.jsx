import { Navigate, Outlet } from "react-router-dom";

import useMeStore from "@/zustand/useMeStore";
import { toast } from "sonner";
import { UseSlideBar } from "@/components/slidebars";
import { Header } from "@/components/headers";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const UserLayOut = () => {
  const { me } = useMeStore();
  if (!me) {
    toast.info("You must be logged in");

    return <Navigate to="/" />;
  }

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-80px)] bg-stone-100   ">
        <div className="w-[164px] lg:w-[256px]  h-full flex-none ">
          <UseSlideBar />
        </div>
        <div className="flex-auto ">
          <ScrollArea className="h-full w-auto lg:h-[400px] ">
            <Outlet />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default UserLayOut;

