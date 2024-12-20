import { create } from "zustand";  
import { apiGetWishList, apiToggleWishList } from '@/apis/wishlist';  

const useWishlistStore = create((set, get) => ({  
  store: [],              
  wishlistItems: [],      
  toggleWishlist: false, // Biến cờ hiệu để kiểm soát việc gọi API

  // Hàm để thay đổi trạng thái của toggle
  setToggleWishlist: () => set((state) => ({ toggleWishlist: !state.toggleWishlist })),
  setStoreNull: () => set(() => ({ store: [] })),
  // Function để toggle một wishlist item
  setStoreWishlist: async (idPost) => {  
    try {  
      const response = await apiToggleWishList(idPost);  
      if (response.data.success) {  
        set((state) => {  
          const isPostInWishlist = state.store.includes(idPost);  
          let newStore;  
          let newWishlistItems;  

          if (isPostInWishlist) {  
            // Nếu đã tồn tại, xóa khỏi wishlist  
            newStore = state.store.filter((p) => p !== idPost);  
            newWishlistItems = state.wishlistItems.filter((item) => item.idPost !== idPost);  
          } else {  
            // Nếu không tồn tại, thêm vào wishlist  
            newStore = [idPost, ...state.store];  
            newWishlistItems = [response.data.item, ...state.wishlistItems];  

            // Giới hạn số lượng wishlist tối đa là 4
            if (newStore.length > 4) {  
              newStore.pop();  
              newWishlistItems.pop();  
            }  
          }  

          return { store: newStore, wishlistItems: newWishlistItems };  
        });

        // Bật cờ hiệu để báo rằng đã có thay đổi
        set((state) => ({ toggleWishlist: !state.toggleWishlist }));
      }  
    } catch (error) {  
      console.error("Failed to toggle wishlist item:", error);  
    }  
  },  

  // Function để fetch wishlist từ API
  fetchWishlist: async () => {  
    try {  
      const response = await apiGetWishList();  
      if (response.status === 200) {  
        set({   
          wishlistItems: response.data,  
          store: response.data.map((item) => item.idPost)  
        });  
      }  
    } catch (error) {  
      console.error("Failed to fetch wishlist:", error);  
    }  
  },  

  // Kiểm tra xem một bài viết có trong wishlist hay không
  isInWishlist: (idPost) => get().store.includes(idPost),  
}));  

export default useWishlistStore;
