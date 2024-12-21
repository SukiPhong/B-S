import React, { useCallback, useEffect, useState } from "react";
import { apiDeletePostId, apiGetPrototypes } from "@/apis/post";
import { useSearchParams } from "react-router-dom";
import useMeStore from "@/zustand/useMeStore";
import useSearchStore from "@/zustand/useSearchStore";
import { PaginationComponent } from "../pagination";
import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";
import { MapPin, X } from "lucide-react";
import useMapStore from "@/zustand/useMapStore";
import { toast } from "sonner";
import { FilterCard } from ".";
import { Switch } from "../ui/switch";
import PropTypes from 'prop-types'

const CardPrototypes = ({ setLayout, limit, ListingType }) => {
  const { showMap, toggleMap, resetDataMaps, setDataMaps } = useMapStore();
  const { me } = useMeStore();
  const [properties, setProperties] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearch, resetSearchData } = useSearchStore();
  const [selectedValue, setSelectedValue] = useState("");
  const params = Object.fromEntries([...searchParams]);
  useEffect(() => {
    resetSearchData();
    resetDataMaps();
    window.scrollTo({ top: 300, behavior: "smooth" });
    const fetchPrototypes = async (params) => {
      setIsLoading(true); // Start loading before making the API call
      try {
        const response = await apiGetPrototypes({
          idUser: setLayout ? me.id : undefined,
          limit,
          ...params,
        });

        if (response.data.success) {
          setProperties(response.data.data);
          setDataMaps(response.data.data.rows);
        } else {
          toast.error("Không thể lấy dữ liệu.");
        }
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu.");
      } finally {
        setIsLoading(false); // Stop loading once the API call is done or if it fails
      }
    };

    if (searchParams.get("page") > properties?.count) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }

    // if (!setLayout) {
    // }
    params.status = "Chờ duyệt,Nháp"; //  này là notIn tức là   không có chờ duyệt và nháp
    // if (selectedValue) {
    //   params.soft = selectedValue;
    // }else{}
    params.soft = selectedValue
      ? (params.soft = selectedValue)
      : (params.soft = "-createdAt");
    params.ListingType = ListingType;

    if (params.price) params.price = searchParams.getAll("price");
    if (params.size) params.size = searchParams.getAll("size");
    const properType = searchParams.get("properType");
    setSearch("properType", properType || "");
    setSearch("rows", properties?.rows.length);
    fetchPrototypes(params);
  }, [searchParams, selectedValue]);
  const handleRemove = useCallback(
    async (pid) => {
      try {
        const confirmDelete = window.confirm(
          "Bạn có chắc chắn muốn xóa bài đăng này?"
        );
        if (!confirmDelete) return;

        await apiDeletePostId(pid);

        // Gọi lại API để đồng bộ danh sách
        setProperties((prev) => ({
          ...prev,
          rows: prev.rows.filter((item) => item.id !== pid),
        }));

        toast.success("Xóa bài viết thành công!");
      } catch (error) {
        toast.error("Xóa bài viết thất bại. Vui lòng thử lại.");
      }
    },
    [params, setProperties]
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (properties?.rows?.length <= 0) {
    return (
      <div className="flex justify-center">
        <span className="text-xl font-bole font-roboto">
          Không tìm thấy thông tin bạn cần vui lòng nhập thông tin khác
        </span>
      </div>
    );
  }
  return (
    <div >
      <div
        className={`flex items-center justify-between py-2 border-t border-b ${
          setLayout && "mb-4"
        }`}
      >
        <div className="flex space-x-2 overflow-x-auto justify-between items-center w-full">
          {!setLayout ? (
            <Button
              variant={showMap ? "destructive" : "default"}
              onClick={toggleMap}
              className=" whitespace-nowrap flex-shrink-0"
            >
              {showMap ? (
                <X className="w-4 h-4 mr-2" />
              ) : (
                <MapPin className="w-4 h-4 mr-2" />
              )}
              {showMap ? "Ẩn bản đồ" : "Hiện bản đồ"}
            </Button>
          ) : (
            <div></div>
          )}

          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              <p>Xác thực</p>
              <Switch
                checked={params.verified || false}
                onCheckedChange={(checked) => {
                  setSearchParams((prev) => {
                    if (checked) {
                      prev.set("verified", "true");
                    } else {
                      prev.delete("verified");
                    }
                    return prev;
                  });
                }}
              />
            </div>
            <select
              id="example-select"
              value={selectedValue}
              onChange={(e) => {
                setSelectedValue(e.target.value);
              }}
            >
              <option value="-createdAt">Cũ nhất</option>
              <option value="createdAt">Mới nhất</option>
              <option value="title">A-Z</option>
              <option value="-title">Z-A</option>
              <option value="price">Giá tăng dần</option>
              <option value="-price">Giá giảm dần</option>
              <option value="size">Diện tích tăng dần</option>
              <option value="-size">Diện tích giảm dần</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`${!setLayout&&'grid grid-cols-10'}`}>
      <div className={`${!setLayout ?'col-span-7':'col-span-10'} grid grid-cols-10 gap-3 mb-4 mt-2  `}>
      
      {properties?.rows?.map((property) => (
        
        <PropertyCard
          key={property.id}
          property={property}
          setLayout={setLayout}
          onRemove={handleRemove}
          className='bg-blue-400 w-full'
        />
        
      ))}
      
        </div>
        {!setLayout && (
          <div className="col-span-3 pl-2">
            <FilterCard />
          </div>
        )}
      </div>
      <div className="grid grid-cols-10 gap-3 mb-4">
        <div className="col-span-7">
          {properties?.rows?.length > 0 && (
            <PaginationComponent
              total={properties?.count}
              currentPage={properties?.page}
              limit={properties?.limit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPrototypes;
CardPrototypes.propTypes={
  setLayout:PropTypes.bool,
  limit:PropTypes.string.isRequired,
  ListingType:PropTypes.string.isRequired
}
