"use client";

import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ImageIcon,
  MapPin,
  Calendar,
  EllipsisVertical,
  Tag,
  BadgeCheck,
  EthernetPort,
} from "lucide-react";
import { Link } from "react-router-dom";
import { pathnames } from "@/lib/pathname";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { resetOutline } from "@/lib/classname";
import { ConditionRendering, Customtooltip } from "../layouts";
import { formatPrice, getStatusColor } from "@/lib/propertyUtils";
import { PosterInfoBox } from ".";
import useMeStore from "@/zustand/useMeStore";
import { WishListItem } from "../Wishlist";
import PropTypes from "prop-types";
import { description } from "@/lib/fn";

const PropertyCard = ({ property, setLayout, onRemove }) => {
  console.log(setLayout)
  const { me } = useMeStore();
  const priority = property?.rUser?.rPricing?.priority >= 4;

  return (
    <Card
      className={cn(
        "overflow-hidden bg-slate-100 ",
        setLayout ? "col-span-5" : "col-span-10"
      )}
    >
      <div className="grid grid-cols-10 w-full">
        {/* Image Section - Fixed aspect ratio */}
        <div className="col-span-4 relative aspect ">
          <img
            loading="lazy"
            src={property.images[0]}
            alt={property.title}
            className="absolute inset-0 w-full h-full rounded-lg p-0 object-cover transition-transform hover:scale-105"
          />
          <Badge
            className={cn(
              "absolute top-0 left-0 ",
              getStatusColor(property.status),
              "text-white border-none shadow-[0_4px_8px_rgba(0,0,0,0.2)] capitalize"
            )}
          >
            {property.status}
          </Badge>
          <Badge className="absolute bottom-2 right-2 bg-black/50 text-white border-none">
            <ImageIcon className="w-4 h-4 mr-1" />
            {property.images.length}
          </Badge>
        </div>

        {/* Content Section - Fixed height with scroll */}
        <div className="col-span-6 p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <Link
              to={`${pathnames.public.Property_Detail}/${property.idPost}`}
              className="flex-1 min-w-0"
            >
              <h3 className="font-semibold truncate hover:underline">
                {property.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 ml-2">
              {!setLayout && <WishListItem id={property.id} />}
              <ConditionRendering show={setLayout || me?.Role === true}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical
                      size={14}
                      className={cn(resetOutline, "cursor-pointer")}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-primary">
                      Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onRemove(property?.id)}
                    >
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ConditionRendering>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-4">
              <span className="font-medium text-primary">
                {formatPrice(property.price, property.priceUnits)}
              </span>
              <span>{property.size}m²</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {property.district}, {property.province}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(property.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4 shrink-0" />
                <span>{property.properType}</span>
              </span>
            </div>

            <div className="flex gap-5 ">
              {property.verified && (
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-green-900 font-medium">Xác thực</span>
                </div>
              )}
              {property.rUser.rPricing.priority >= 3 && (
                <Customtooltip
                  trigger={<EthernetPort size={20} className="text-[#5c64a8] " />}
                  content={
                    <div className="flex flex-col w-48 h-48">
                      <p className="font-bold text-2xl">Mô tả</p>
                      <p>
                        <span  >{property.description.slice(0,200)+'...'}</span>
                      </p>
                    </div>
                  }
                />
              )}
            </div>

            {/* {!setLayout && property?.rUser?.rPricing?.priority >= 2 && (
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Mô tả</p>
                <p className="line-clamp-2">{property.description}</p>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Poster Info - Only show if conditions met */}
      {me?.fullname !== property?.rUser?.fullname &&
        property?.rUser?.rPricing?.priority >= 4 && (
          <div className="bg-[#2C99AE] mt-auto">
            <PosterInfoBox
              fullname={property?.rUser?.fullname}
              avatar={property?.rUser?.avatar}
              phone={property?.rUser?.phone}
              isList={true}
            />
          </div>
        )}
    </Card>
  );
};

PropertyCard.propTypes = {
  onRemove: PropTypes.func.isRequired,
  setLayout: PropTypes.bool,
  property: PropTypes.object.isRequired,
};

export default memo(PropertyCard);
