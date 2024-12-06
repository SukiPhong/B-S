import {
  postRentTypes,
  postSoldTypes,
  postTypes,
  price,
  size,
} from "@/lib/contants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import SearchProven from "./SearchProven";
import { cn } from "@/lib/utils";

import PopoverRange from "./PopoverRange";
import PopoverCheckBox from "./PopoverCheckBox";
const Search = ({check=false}) => {
  const [activeTab, setActiveTab] = useState("Cho thuê");
  const [isShowProven, setIsShowProven] = useState(false);
  return (
    <div className={` ${check ?'w-auto h-[auto] mt-4':"absolute top-16"} left-10 right-10  text-slate-50 flex items-center justify-center`}>
      <div className="w-[945px] max-w-[90%]">
        <Tabs
          className="space-y-0"
          onValueChange={(value) => setActiveTab(value)}
          value={activeTab}
        >
          <TabsList className="rounded-b-none  bg-black/60 p-0 ">
            {postTypes.map((el) => (
              <TabsTrigger
                className="data-[state=active]:bg-main data-[state=active]:text-slate-50 h-full bg-slate-200 text-slate-950  first:rounded-tl-md last:rounded-tr-md rounded-b-none  "
                value={el.value}
                key={el.id}
              >
                {el.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {postTypes.map((el) => (
            <TabsContent
              className="bg-black/60 rounded-md rounded-tl-none p-4 space-y-4 text-sm"
              value={el.value}
              key={el.id}
            >
              <div
                onClick={() => {
                  setIsShowProven((prev) => !prev);
                }}
                className={cn(
                  "flex items-center justify-between bg-slate-50 rounded-md  px-[6px] py-1 relative ",
                  isShowProven && "rounded-b-none "
                )}
              >
                <p className="text-sm flex items-center gap-2 font-semibold text-slate-900">
                  <SearchIcon size={24} color="#222222" />
                  <span>Trên toàn quốc</span>
                </p>
                <Button>Tìm kiếm</Button>
                {isShowProven && (
                  <SearchProven
                    onClose={() => {
                      setIsShowProven(false);
                    }}
                  />
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 ">
                <PopoverRange
                  name="price"
                  label="Mức giá"
                  _name="_price"
                  options={price}
                />
                <PopoverRange
                  name="size"
                  label="Diện tích"
                  _name="_size"
                  options={size}
                />
                <PopoverCheckBox
                  label="Loại tin đăng"
                  name="postTypes"
                  options={
                    activeTab === "Cho thuê"
                      ? postRentTypes.map((el) => ({
                          id: el.pathname,
                          label: el.name,
                        }))
                      : postSoldTypes.map((el) => ({
                          id: el.pathname,
                          label: el.name,
                        }))
                  }
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
