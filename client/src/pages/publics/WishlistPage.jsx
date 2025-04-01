import { apiGetWishList } from "@/apis/wishlist";
import { ConditionRendering, Section } from "@/components/layouts";
import PropertyCard from "@/components/Propetyes/PropertyCard";
import React, { useEffect, useState } from "react";
import useWishlistStore from "@/zustand/useWishList";
import { cn } from "@/lib/utils";

const WishlistPage = () => {
  const { wishlistItems, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);
  return (
    <div>
    <Section title="Danh sách yêu thích" className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems?.map((el) => (
          <div className="col-span-1 bg-red-300 h-full " key={el.id}>
            <PropertyCard key={el.id} property={el.rPost}  isWishlist={true}/>
          </div>
        ))}
      </div>
    </Section>
  </div>
  );
};

export default WishlistPage;
