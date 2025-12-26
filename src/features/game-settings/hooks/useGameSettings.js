import { useCallback } from "react";
import { usePersistentState } from "@shared/hooks/usePersistentState.js";

export const WORD_LENGTH_CONSTRAINTS = { MIN: 4, MAX: 8 };
export const TIME_CONSTRAINTS = { MIN: 30, MAX: 300 };

export const DEFAULT_SETTINGS = {
    minWordLength: 4,
    maxWordLength: 6,
    timeSeconds: 60,
    category: "",
};

const STORAGE_KEY = "anagram:settings";

export function useGameSettings() {
    const { value: settings, setValue: setSettings, reset } =
        usePersistentState(STORAGE_KEY, DEFAULT_SETTINGS);

    const isValid = useCallback(() => {
        return Boolean(
            settings.minWordLength &&
            settings.maxWordLength &&
            settings.timeSeconds &&
            settings.category
        );
    }, [settings]);

    return {
        settings,
        updateSettings: setSettings,
        reset,
        isValid,
    };
}