import { create } from "zustand";

export const useStore = create((set) => ({
    globalReload: false,
    setGlobalReload: (newVal) => set(() => ({ globalReload: newVal })),
    isImageLoading: false,
    setIsImageLoading: (value) => set(() => ({ isImageLoading: value })),
}));
