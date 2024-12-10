import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageIcon, MapPin, Calendar, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { pathnames } from "@/lib/pathname";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { resetOutline } from "@/lib/classname";
import { ConditionRendering } from "../layouts";
import { formatPrice, getStatusColor } from "@/lib/propertyUtils";
import { PosterInfoBox } from ".";
import useMeStore from "@/zustand/useMeStore";

const PropertyCard = ({ property, setLayout, onRemove }) => {
  const { me } = useMeStore();
  return (
    <Card
      className={`${setLayout ? "col-span-5" : "col-span-10"} overflow-hidden`}
    >
      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-3 relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full"
          />

          <>
            <Badge
              className={`absolute top-0 left-0 ${getStatusColor(
                property.status
              )} text-white border-none`}
            >
              {property.status}
            </Badge>
            <Badge className="absolute bottom-2 right-2 bg-black/50 text-white border-none">
              <ImageIcon className="w-4 h-4 mr-1" />
              {property.images.length}
            </Badge>
          </>
        </div>
        <div className="col-span-6 p-4">
          <span className="flex items-center w-full">
            <Link to={`${pathnames.public.Property_Detail}/${property.idPost}`}>
              <h3 className="font-semibold truncate break-words flex-1 hover:underline">
                {property.title}
              </h3>
            </Link>
            <ConditionRendering show={setLayout}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical
                    size={14}
                    className={cn(resetOutline, "ml-2 cursor-pointer")}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-300 rounded-md">
                  <DropdownMenuItem className="text-main">
                    <span>Sửa</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red"
                    onClick={() => onRemove(property.idPost)}
                  >
                    <span>Xóa</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ConditionRendering>
          </span>
          <div className="mt-2 space-y-2">
            <div className="flex  gap-10 text-sm">
              <span className="font-medium text-primary">
                {formatPrice(property.price, property.priceUnits)}
              </span>
              <span>{property.size}m²</span>
            </div>
            <div className="flex items-center   gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1 mr-4">
                <MapPin className="w-4 h-4 shrink-0  " />
                
                <span className="break-words">{property.district},{property.province}</span>
              </span>
              <span className="flex gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {`${new Date(property.createdAt).toLocaleDateString(
                    "vi-VN"
                  )}`}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"></div>
            <div>
           
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-roboto font-semibold underline">Mô tả</p>
                  <span className="line-clamp-2">{property.description}</span>
                </div>
             
              
            </div>
          </div>
          {me?.rPricing.priority >= 3 && 
                <div className="mt-4">
                  <PosterInfoBox
                  fullname={property?.rUser?.fullname}
                  avatar={property?.rUser?.avatar}
                  phone={property?.rUser?.phone}
                  isList={true}
                />
                </div>
            
              }
        
        </div>
       
        
      </div>
          
    </Card>
  );
};

export default PropertyCard;
