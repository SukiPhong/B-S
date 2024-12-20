
import { create } from 'zustand'

const useMapStore = create((set) => ({
    showMap: false,
    dataMapsForList:[],
    setDataMaps:(data) => set( {dataMapsForList:data} ),
    resetDataMaps:() => {set({dataMapsForList:[]}) },
    toggleMap: () => set((state) => ({ showMap: !state.showMap })),
  }));
  
export default useMapStore