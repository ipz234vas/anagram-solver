import { create } from "zustand";

const initialState = {
    score: 0,
    wordsCompleted: 0,
    wordsSkipped: 0,
};

export const useGameStatsStore = create()((set) => ({
    ...initialState,

    addScore: (points) => set((s) => ({ score: s.score + points })),
    subtractScore: (points) => set((s) => ({ score: Math.max(0, s.score - points) })),

    incrementWordsCompleted: () => set((s) => ({ wordsCompleted: s.wordsCompleted + 1 })),
    incrementWordsSkipped: () => set((s) => ({ wordsSkipped: s.wordsSkipped + 1 })),

    resetStats: () => set(initialState),
}));