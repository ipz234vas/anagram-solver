import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const WORD_LENGTH_CONSTRAINTS = { MIN: 4, MAX: 8 };
export const TIME_CONSTRAINTS = { MIN: 30, MAX: 300 };

export const DEFAULT_SETTINGS = {
    minWordLength: 4,
    maxWordLength: 6,
    timeSeconds: 60,
    category: "",
};

const STORAGE_KEY = "anagram:settings";

export const useGameSettingsStore = create()(
    persist(
        (set, get) => ({
            settings: DEFAULT_SETTINGS,

            updateSettings: (patch) =>
                set((state) => ({
                    settings: { ...state.settings, ...patch },
                })),

            setSettings: (settings) => set({ settings }),

            reset: () => set({ settings: DEFAULT_SETTINGS }),

            isValid: () => {
                const s = get().settings;
                return Boolean(
                    s.minWordLength &&
                    s.maxWordLength &&
                    s.timeSeconds &&
                    s.category
                );
            },
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({ settings: state.settings }),

            version: 1,

            merge: (persistedState, currentState) => {
                const persistedSettings = persistedState?.settings ?? {};
                return {
                    ...currentState,
                    settings: { ...DEFAULT_SETTINGS, ...persistedSettings },
                };
            },
        }
    )
);
