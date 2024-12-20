import React, { memo } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  ImageIcon,
  MapPin,
  Calendar,
  EllipsisVertical,
  Tag,
  Heart,
  BadgeCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { WishListItem } from "../Wishlist";

const PropertyCard = ({ property, setLayout, onRemove }) => {
  const { me } = useMeStore();
  const navigate = useNavigate();
  return (
    <Card
      className={`${setLayout ? "col-span-5" : "col-span-10"} overflow-hidden bg-slate-100`}
    >
      <div className="grid grid-cols-9 gap-4 w-full h-full">
        <div className="col-span-3 relative w-full h-full">
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
            <div className="flex-1">
              <Link
                to={`${pathnames.public.Property_Detail}/${property.idPost}`}
              >
                <h3 className="font-semibold truncate break-words flex-1 hover:underline">
                  {property.title.length > 30
                    ? `${property.title?.slice(0, 25)}...`
                    : property.title}
                </h3>
              </Link>
            </div>
            <div className="flex">
              {!setLayout && <WishListItem id={property.id} />}
              <ConditionRendering show={setLayout || me?.Role === true}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical
                      size={14}
                      className={cn(resetOutline, "ml-2 cursor-pointer")}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-300 rounded-md">
                    <DropdownMenuItem
                      className="text-main"
                      onClick={() => {
                        navigate(
                          `${pathnames.users.layout}${pathnames.users.createPost}`,
                          {
                            state: { editMode: true, idPost: property.idPost },
                          }
                        );
                      }}
                    >
                      Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red"
                      onClick={() => onRemove(property?.id)}
                    >
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ConditionRendering>
            </div>
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

                <span className="break-words">
                  {property.district},{property.province}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {`${new Date(property.createdAt).toLocaleDateString(
                    "vi-VN"
                  )}`}
                </span>
              </span>
              <span className="flex gap-1">
                <Tag className="w-4 h-4 shrink-0" />
                <span>{property.properType}</span>
              </span>
            </div>
            <div>
              {property.verified && (
                <span className="flex items-center gap-2 mb-1 ">
                  <BadgeCheck color="green" size={14} />
                  <span className="text-green-900 font-semibold">Xác thực</span>
                </span>
              )}
            </div>
            {!setLayout && (
              <div>
                <div className="mt-2 text-sm text-gray-600">
                  {property?.rUser?.rPricing?.priority >= 2 && (
                    <div>
                      <p className="font-roboto font-semibold underline">
                        Mô tả
                      </p>
                      <span className="line-clamp-2">
                        {property.description}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {property?.rUser?.rPricing.priority >= 4 && (
            <div className="mt-4">
              <PosterInfoBox
                fullname={property?.rUser?.fullname}
                avatar={property?.rUser?.avatar}
                phone={property?.rUser?.phone}
                isList={true}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default memo(PropertyCard);
