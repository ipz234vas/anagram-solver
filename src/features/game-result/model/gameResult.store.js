import { create } from "zustand";
import { persist } from "zustand/middleware";
import { sessionStorageWrapper } from "@shared/storage/storage.js";

const STORAGE_KEY = "anagram:last-result";

const zustandSessionGdprStorage = {
    getItem: (name) => sessionStorageWrapper.get(name),
    setItem: (name, value) => sessionStorageWrapper.set(name, value),
    removeItem: (name) => sessionStorageWrapper.remove(name),
};

export const useGameResultStore = create()(
    persist(
        (set) => ({
            lastResult: null,
            setLastResult: (result) => set({ lastResult: result }),
            clearLastResult: () => set({ lastResult: null }),
        }),
        {
            name: STORAGE_KEY,
            storage: zustandSessionGdprStorage,
            partialize: (s) => ({ lastResult: s.lastResult }),
            version: 1,
        }
    )
);