import CardPrototypes from "@/components/Propetyes/CardPrototypes";
import { Search } from "@/components/searchs";
import React from "react";

const RentProperty = () => {
  return (
    <div className="w-[945px] mx-auto ">
      <div className=" relative h-[180px] ">
        <Search check={true} />
      </div>
      <div className="w-[850px] mx-auto">
        {" "}
        <CardPrototypes
          className="h-[190px]"
          limit={import.meta.env.VITE_LIMIT_LIST}
          
        />
      </div>
    </div>
  );
};

export default RentProperty;
