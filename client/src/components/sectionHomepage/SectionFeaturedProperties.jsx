import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { AreaChart, Bath, Bed, DollarSign, ImageIcon, MapPin } from "lucide-react";
import { apiGetFeatured } from "@/apis/post";
import { formatPrice, getStatusColor } from "@/lib/propertyUtils";
import { WishListItem } from "../Wishlist";
import { Badge } from "../ui/badge";
import { pathnames } from "@/lib/pathname";
import { Link } from "react-router-dom";

const SectionFeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetFeatured();
      if (response.data.success)
        setFeaturedProperties(
          response.data.data.sort(() => 0.5 - Math.random()).slice(0, 10)
        );
    };

    fetchData();
  }, []);
  return (
    <section className="py-14 z-10 ">
      <div className="container mx-auto ">
        <h2 className="text-xl font-bold font-roboto mb-8 text-start pl-2 text-[#001C43]">
          Bất động sản dành cho bạn
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2   ">
          {featuredProperties?.map((el) => (
            <Card key={el.id} className="w-full h-full px-1 flex flex-col">
            <div className="relative overflow-hidden aspect-[3/2]">
              <img
                src={el.images[0]}
                alt="Property"
                className="w-full h-32 object-cover rounded hover:animate-scale-up-center"
              />
               <Badge className="absolute bottom-2 right-2 bg-black/50 text-white border-none">
              <ImageIcon className="w-4 h-4 mr-1" />
              {el.images.length}
            </Badge>
            </div>
            <div className="py-1 px-2 space-y-1">
              <Link className="font-roboto text-sm truncate block hover:underline" to={`${pathnames.public.Property_Detail}/${el.idPost}`}>
                {el.title.length > 25 ? el.title.slice(0, 25) + "..." : el.title}
              </Link>
              <div className="flex justify-start text-xs gap-2 font-bold text-main">
                <span className="flex items-center">
                  {formatPrice(el.price, el.priceUnits)}
                </span>
                <span className="flex items-center">{el.size}m²</span>
              </div>
              <div className="flex items-center gap-1 text-xs h-[18px]">
                <MapPin size={14} />
                <span>
                  {el.province.includes("Thành phố ")
                    ? el.province.replace("Thành phố ", "TP.")
                    : el.province}
                </span>
              </div>
            </div>
            <CardFooter className="flex-none mt-auto py-1 px-2 bg-slate-100 text-xs flex justify-between items-center">
              <span>{`Đăng ngày ${new Date(el.createdAt).toLocaleDateString("vi-VN")}`}</span>
              <WishListItem />
            </CardFooter>
          </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionFeaturedProperties;
