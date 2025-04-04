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
import { FilterCard, PosterInfoBox } from ".";
import { Switch } from "../ui/switch";
import PropTypes from "prop-types";
import { SkeletonCard } from "../layouts";
import useProperty from "@/zustand/useProperty";
import { cn } from "@/lib/utils";

const CardPrototypes = ({ setLayout, limit, ListingType }) => {
  const { showMap, toggleMap, resetDataMaps, setDataMaps } = useMapStore();
  const { setSearch, resetSearchData } = useSearchStore();
  const { me } = useMeStore();
  const { setTotalPrototypes } = useProperty();
  const [properties, setProperties] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState("");
  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    resetSearchData();
    resetDataMaps();
    window.scrollTo({ top: 300, behavior: "smooth" });

    const fetchPrototypes = async (params) => {
      setIsLoading(true);
      try {
        const response = await apiGetPrototypes({
          idUser: setLayout ? me.id : undefined,
          limit,
          ...params,
        });

        if (response.data.success) {
          setProperties(response.data.data);
          setDataMaps(response.data.data.rows);
          setTotalPrototypes(response.data.data.count);
        } else {
          toast.error("Không thể lấy dữ liệu.");
        }
      } catch (error) {
        toast.error(error.response.data.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    params.status = "Chờ duyệt,Nháp";
    params.soft = selectedValue || "-createdAt";
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
        setProperties((prev) => ({
          ...prev,
          rows: prev.rows.filter((item) => item.id !== pid),
        }));
        toast.success("Xóa bài viết thành công!");
      } catch (error) {
        toast.error("Xóa bài viết thất bại. Vui lòng thử lại.");
      }
    },
    [setProperties]
  );

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: +limit }).map((_, index) => (
          <SkeletonCard key={index} isHideSub={true} className="w-[50%]" />
        ))}
      </div>
    );
  }

  if (!properties?.rows?.length) {
    return (
      <div className="flex justify-center">
        <span className="text-xl font-bold font-roboto">
          {setLayout
            ? "không có bài viết"
            : "Không tìm thấy thông tin bạn cần vui lòng nhập thông tin khác"}
        </span>
      </div>
    );
  }

  const gridClassName =
    properties?.rows?.length < 2 ? "grid-cols-2" : "grid-cols-10";
  return (
    <div>
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
              className="whitespace-nowrap flex-shrink-0"
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

      <div className={`${!setLayout && "grid grid-cols-10"}`}>
        <div
          className={cn(
            !setLayout
              ? !showMap
                ? "col-span-7"
                : "col-span-10"
              : "col-span-10",
            gridClassName,
            "grid  gap-3 mb-4 mt-2 h-fit "
          )}
        >
          {properties?.rows?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              setLayout={setLayout}
              onRemove={handleRemove}
              length={properties?.rows?.length}
            />
          ))}
          {properties?.rows?.length < 2 && (
            <div className="opacity-0 w-full h-full col-span-1"></div>
          )}
        </div>
        {!setLayout && !showMap && (
          <div className="col-span-3 pl-2">
            <FilterCard />
          </div>
        )}
      </div>
      <div className="grid grid-cols-10 gap-3 mb-4">
        <div className="col-span-10">
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
CardPrototypes.propTypes = {
  setLayout: PropTypes.bool,
  limit: PropTypes.string.isRequired,
  ListingType: PropTypes.string,
};
