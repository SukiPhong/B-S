import React from 'react';
import { Heart } from 'lucide-react';
import useMeStore from '@/zustand/useMeStore';
import useWishlistStore from '@/zustand/useWishList';
import { toast } from 'sonner';

const WishListItem = ({ id }) => {
  const { me } = useMeStore();
  const { setStoreWishlist, isInWishlist } = useWishlistStore();
  const isWishListed = isInWishlist(id);

  const handleToggleWishlist = async () => {
    if (!me) return toast.warning('Vui lòng đăng nhập để chọn');
    await setStoreWishlist(id);
  };

  return (
    <div onClick={handleToggleWishlist} className="cursor-pointer">
      <Heart size={20} className={isWishListed ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
    </div>
  );
};

export default WishListItem;

