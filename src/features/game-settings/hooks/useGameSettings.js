import { useState, useEffect } from 'react';

export const WORD_LENGTH_CONSTRAINTS = {
    MIN: 4,
    MAX: 8,
};

export const TIME_CONSTRAINTS = {
    MIN: 30,
    MAX: 300,
};

export const DEFAULT_SETTINGS = {
    minWordLength: 4,
    maxWordLength: 6,
    timeSeconds: 60,
    category: "",
};

const STORAGE_KEY = 'anagram-game-settings';

const storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Помилка запису в сховище:', error);
        }
    },
};

export function useGameSettings() {
    const [settings, setSettings] = useState(() => {
        const saved = storage.get(STORAGE_KEY);
        return saved ? { ...DEFAULT_SETTINGS, ...saved } : DEFAULT_SETTINGS;
    });

    useEffect(() => {
        storage.set(STORAGE_KEY, settings);
    }, [settings]);

    const isValid = () => {
        return Boolean(
            settings.minWordLength &&
            settings.maxWordLength &&
            settings.timeSeconds &&
            settings.category
        );
    };

    return {
        settings,
        updateSettings: setSettings,
        isValid,
    };
}