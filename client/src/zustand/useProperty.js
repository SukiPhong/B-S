import { apiGetPrototypes } from "@/apis/post";
import { create } from "zustand";



const useProperty = create((set, get) => ({
  listPosts: null,
  fetchPosts: async (limit, params) => {
    try {
      const response = await apiGetPrototypes({
        limit,
        ...params,
      });
      if (response.status === 200) {
        return set(() => ({ listPosts: response.data.data }));
      }
    } catch (error) {
      console.log(err);
    }
  },
}));
export default useProperty;