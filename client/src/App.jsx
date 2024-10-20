import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import useMeStore from "./zustand/useMeStore";
import userExternal from "./zustand/userExternal";

const App = () => {
  const { token, getCurrent } = useMeStore();
  const { getProvinces } = userExternal();
  useEffect(() => {
    getProvinces();
  }, []);
  useEffect(() => {
    if (token) getCurrent();
  }, [token]);
  return (
    <main>
      <Outlet />
      <Toaster position="top-center" expand={false} richColors />
    </main>
  );
};

export default App;
