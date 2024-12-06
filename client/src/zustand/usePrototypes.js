import { apiGetPrototypes } from "@/apis/post";
import { create } from "zustand";

const usePrototypes = create((set) => ({
  prototypes: [],

  getPrototypes: async (params) => {
    try {
      const response = await apiGetPrototypes(params);

      if (response.status === 200) {
        return set(() => ({ prototypes: response.data.data }));
      } else {
        return set(() => ({ provinces: [] }));
      }
    } catch (error) {
      error;
    }
  },
}));
export default usePrototypes;
