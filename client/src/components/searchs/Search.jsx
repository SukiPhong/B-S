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
import PropTypes from "prop-types";
import PopoverRange from "./PopoverRange";
import PopoverCheckBox from "./PopoverCheckBox";
import { resetOutline } from "@/lib/classname";
import { createSearchParams, useNavigate } from "react-router-dom";
import { pathnames } from "@/lib/pathname";
import useSearchStore from "@/zustand/useSearchStore";
const Search = ({ check, noShowSearchProven = false }) => {
  const [activeTab, setActiveTab] = useState("Cho thuê");
  const [isShowProven, setIsShowProven] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const { searchData, setSearchData } = useSearchStore();
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  
  const navigate = useNavigate();
  const onSubmit = () => {
    setIsShowProven(true);
    const params = new Object();
    if (searchData.title) {
      params.title = searchData.title;
    }
    if (searchData.properType) {
      params.properType = searchData.properType;
    }
    if(searchData.price){
      params.price = searchData.price;
    }
    if(searchData.size){
      params.size = searchData.size;
    }
    navigate({
      pathname: `${
        activeTab === "Cho thuê"
          ? pathnames.public.rentProperty
          : pathnames.public.soldProperty
      }`,
      search: createSearchParams(params).toString(),
    });
   
    // Thực hiện logic tìm kiếm tại đây
  };
  const handleCitySelect = (cityName) => {
    console.log(cityName)
    setSearchData({ province: cityName }); // Cập nhật giá trị input khi chọn thành phố
    setIsShowProven(false); // Đóng popup sau khi chọn thành phố
  };
  return (
    <div
      className={` ${
        check ? "w-full h-auto mt-4 " : "absolute md:top-0 lg:top-16 left-10 right-10"
      }   text-slate-50 flex items-center justify-center`}
    >
      <div className={`w-[945px] ${check ?'max-w-[100%]':'max-w-[90%]'}`}>
        <Tabs
          className="space-y-0"
          onValueChange={(value) => setActiveTab(value)}
          value={activeTab}
        >
          {/* này là bán với cho thuê */}
          <TabsList className="rounded-b-none  bg-black/60 p-0 ">
            {postTypes.map((el) => (
              <TabsTrigger
                className="data-[state=active]:bg-main data-[state=active]:text-slate-50 h-full w-[80px] bg-slate-200 text-slate-950  first:rounded-tl-md last:rounded-tr-md rounded-b-none  "
                value={el.value}
                key={el.id}
              >
                {el.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* phần này là nội dung search */}
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
                  "flex items-center justify-between bg-slate-50 rounded-md  px-[6px] py-1 relative   ",
                  isShowProven && "rounded-b-none "
                )}
              >
                <p className="text-sm flex items-center gap-2 font-semibold text-slate-900">
                  <SearchIcon size={24} color="#222222" />
                </p>
                <input
                  type="text"
                  placeholder="trên toàn quốc (địa chỉ)"
                  value={searchData.province}
                  onChange={(e) => setSearchData({ title: e.target.value })}
                  className={cn(
                    resetOutline,
                    "w-full bg-slate-50 border-x-0 border-gray-300 rounded-y-sm  px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 transition"
                  )}
                />

                <Button onClick={onSubmit}>Tìm kiếm</Button>
                {!noShowSearchProven && isShowProven && (
                  <SearchProven
                    onClose={() => {
                      setIsShowProven(false);
                    }}
                    onCitySelect={handleCitySelect}
                  />
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 ">
                <PopoverRange
                  name="price"
                  label="Mức giá"
                  _name="_price"
                  options={price}
                  isOpen={isPriceOpen}
                  setIsOpen={setIsPriceOpen}
                />
                <PopoverRange
                  name="size"
                  label="Diện tích"
                  _name="_size"
                  options={size}
                  isOpen={isSizeOpen}
                  setIsOpen={setIsSizeOpen}
                />
                <PopoverCheckBox
                  label="Loại tin đăng"
                  name="properType"
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
                  isOpen={isPropertyTypeOpen}
                  setIsOpen={setIsPropertyTypeOpen}
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
Search.prototype = {
  check: PropTypes.bool,
};
