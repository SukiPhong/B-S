"use client";

import React, { useEffect, useState } from "react";
import { Section } from "@/components/layouts";
import { apiGetPrototypes } from "@/apis/post";
import { toast } from "sonner";

import { useParams } from "react-router-dom";
import PropertyCard from "@/components/Propetyes/PropertyCard";
import { PosterInfoBox } from "@/components/Propetyes";

const ListPropertyOfUser = () => {
  const { id } = useParams(); // Lấy id từ URL parameters
  const [properties, setProperties] = useState({ rent: [], sale: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await apiGetPrototypes({
          idUser: id, // Sử dụng id từ URL
          fields: "-avgStar,-balonDirection,-bathroom,-bedroom,-interior",
          status: "Chờ duyệt,Nháp", // Loại trừ 'Chờ duyệt' và 'Nháp'
        });
        if (response.data.success) {
          const allProperties = response.data.data;
          const rentProperties = allProperties.filter(
            (prop) => prop.ListingType === "Cho thuê"
          );
          const saleProperties = allProperties.filter(
            (prop) => prop.ListingType === "Bán"
          );

          setProperties({ rent: rentProperties, sale: saleProperties });
          console.log(properties)
          // Lấy thông tin người dùng từ bất kỳ bài đăng nào
          if (allProperties.length > 0) {
            const userInfo = allProperties[0].rUser;
            setUserInfo(userInfo);
          }
        } else {
          toast.error("Không thể lấy dữ liệu.");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProperties();
    }
  }, [id]);

  const renderProperties = (propertyList) => (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      {propertyList.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          setLayout={true}
          onRemove={() => {}} // Thêm chức năng xóa nếu cần
        />
      ))}
    </div>
  );

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <Section title="Danh sách tin của người đăng"  className="overflow-hidden">
      <div className="grid grid-cols-10 gap-4 px-4 h-[calc(100vh-170px)] pb-1">
        <div className="col-span-2">
          {userInfo && (
            <PosterInfoBox
              avatar={userInfo.avatar}
              fullname={userInfo.fullname}
              phone={userInfo.phone}
              id={id}
            />
          )}
        </div>
        <div className="col-span-4">
          <h2 className="text-xl font-bold mb-4">Bài viết cho thuê</h2>
          {renderProperties(properties.rent)}
        </div>
        <div className="col-span-4">
          <h2 className="text-xl font-bold mb-4">Bài viết bán</h2>
          {renderProperties(properties.sale)}
        </div>
      </div>
    </Section>
  );
};

export default ListPropertyOfUser;
