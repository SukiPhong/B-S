import { apiGetCurrent } from '@/apis/user'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
const useMeStore = create(persist((set, get) => ({

    token: null,
    me: null,
    googleData: null,
    setToken: (token) => set(() => ({ token })),
    setMe: (me) => set(() => ({ me })),
    setGoogleData: (data) => set(() => ({ googleData: data })),
    isAuthenticated: () => get().token !== null,
    getCurrent: async () => {
        const response = await apiGetCurrent()
        if (response.status === 200) {

            return set(() => ({ me: response.data.data }))
        }
        else {
            return set(() => ({ me: null, token: null }))
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

    //{token: null, me: null}
}))
export default useMeStore