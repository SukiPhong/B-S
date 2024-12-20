import { create } from "zustand";

const useSearchStore = create((set) => ({
  search: {},
  searchData: {},
  setSearchData: (data) =>
    set((state) => ({ searchData: { ...state.searchData, ...data } })),
  resetSearchData: () => set({ searchData: {} }),
  setSearch: (key, value) =>
    set((state) => {
      const updatedSearch = { ...state.search };
      if (!value) {
        delete updatedSearch[key];
      } else {
        updatedSearch[key] = value;
      }
      return { search: updatedSearch };
    }),
}));

export default useSearchStore;
