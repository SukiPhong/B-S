import { apiGetCurrent, apiUpdatePatchUser } from '@/apis/user'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
const useMeStore = create(persist((set, get) => ({

    token: null,
    me: null,
    googleData: null,
    error: null,
    setToken: (token) => set(() => ({ token ,  })),
    setMe: (me) => set(() => ({ me })),
    setGoogleData: (data) => set(() => ({ googleData: data })),
    isAuthenticated: () => get().token !== null,
    getCurrent: async () => {
       
       try {
        const response = await apiGetCurrent()
    
        if (response.status === 200) {
            
            return set(() => ({ me: response.data.data }))
        }
        else {
            return set(() => ({ me: null, token: null }))
        }
       } catch (error) {
          return set(() => ({ me: null, token: null }))
       }
    },
    setBalance: async (newBalance) => {
         try {
            const response =  await apiUpdatePatchUser({balance:newBalance})
            if(response.status === 200) {
                return set((state) => ({ me : {...state.me, balance:response.data.data} , }))
            }
            else{
                return set(() => ({error :  response.data.message }))
            }
         } catch (error) {
            return set(() => ({error : 'Lỗi website vui lòng thử lai sau' }))
         }
    },
    logout: () => set(() => ({ token: null, me: null })),

}), {
    name: 'BDSv1/me',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) =>
        Object.fromEntries(
            Object.entries(state).filter(([key]) => key === 'token' || key === 'me')
        )

   
}))
export default useMeStore