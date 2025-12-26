import { create } from "zustand";

export const useGameRoundStore = create()((set) => ({
    roundState: null,

    needsInit: true,

    setRoundState: (roundState) => set({ roundState, needsInit: false }),

    updateRoundState: (updates) =>
        set((s) => {
            if (!s.roundState) return s;

            const patch = typeof updates === "function" ? updates(s.roundState) : updates;
            return { roundState: { ...s.roundState, ...patch } };
        }),

    resetRound: () => set({ roundState: null, needsInit: true }),
}));
