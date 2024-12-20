"use client";

import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { pathnames } from "@/lib/pathname";
import { cn } from "@/lib/utils";
import useWishlistStore from "@/zustand/useWishList";
import useMeStore from "@/zustand/useMeStore";

const WishlistPopover = () => {
  const { wishlistItems, fetchWishlist, toggleWishlist } = useWishlistStore();
  const { me } = useMeStore();

  // Fetch wishlist khi `toggleWishlist` thay đổi
  useEffect(() => {
    if (me) {
      fetchWishlist();
    }
  }, [toggleWishlist, me, fetchWishlist]);

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <Heart className="w-6 h-6" />
        {wishlistItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {wishlistItems.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0 mt-4" align="start">
        <div className="p-2 border-b flex justify-center">
          <h3 className="font-medium">Tin đăng đã lưu</h3>
        </div>
        {wishlistItems.length === 0 ? (
          <div className="p-4 text-center">
            <div className="w-14 h-14 mx-auto mb-4 text-gray-400">
              <img
                src="/png/placeholder.png?height=40&width=40"
                alt="Empty wishlist"
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-500">Bấm để lưu tin</p>
            <p className="text-xs text-gray-400">và xem lại tin đã lưu tại đây</p>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {wishlistItems.slice(0, 3).map((item) => (
                <Link
                  key={item?.id}
                  to={`${pathnames.public.Property_Detail}/${item?.rPost?.idPost}`}
                  className={cn(
                    "flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                  )}
                >
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={item?.rPost.images[0]}
                      alt={item?.rPost.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {item?.rPost.title}
                    </h4>
                    <p className="text-xs text-slate-700">{item?.rPost.properType}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to={`${pathnames.public.Wishlist}`}
              className="block p-3 text-center text-sm text-primary hover:bg-gray-50 transition-colors border-t"
            >
              Xem tất cả
              <ChevronRight className="inline-block w-4 h-4 ml-1" />
            </Link>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default WishlistPopover;
