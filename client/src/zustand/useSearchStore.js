import { create } from "zustand";

const useSearchStore = create((set) => ({
  search: {},

  setSearch: (key, value) =>
    set((state) => {
      const updatedSearch = { ...state.search };
      if (value === "" || value === undefined) {
        delete updatedSearch[key]; // Xóa key nếu value là "" hoặc undefined
      } else {
        updatedSearch[key] = value; // Cập nhật key-value
      }
      return { search: updatedSearch };
    }),
}));
export default useSearchStore;