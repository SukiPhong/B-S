import { apiGetDistrictsById, apiGetProvinces } from '@/apis/external'
import { create } from 'zustand'

const userExternal = create((set) => ({

    provinces: [],
  
    getProvinces: async () => {
        const response = await apiGetProvinces()

        if (response.status === 200) {
            return set(() => ({ provinces: response.data }))
        }
        else {
            return set(() => ({ provinces: [] }))
        }
    },

}),)
export default userExternal