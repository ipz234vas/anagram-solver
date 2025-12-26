import { useCallback } from "react";
import {useGameSettingsStore} from "@features/game-settings/model/gameSettings.store.js";

export function useGameSettings() {
    const settings = useGameSettingsStore((s) => s.settings);
    const updateSettings = useGameSettingsStore((s) => s.updateSettings);
    const reset = useGameSettingsStore((s) => s.reset);

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
        updateSettings,
        reset,
        isValid,
    };
}