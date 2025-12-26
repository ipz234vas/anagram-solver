import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const STORAGE_KEY = "anagram:last-result";

export const useGameResultStore = create()(
    persist(
        (set) => ({
            lastResult: null,

            setLastResult: (result) => set({ lastResult: result }),
            clearLastResult: () => set({ lastResult: null }),
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => sessionStorage),
            partialize: (s) => ({ lastResult: s.lastResult }),
            version: 1,
        }
    )
);
