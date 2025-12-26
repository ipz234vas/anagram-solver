import {useGameStatsStore} from "@features/game-flow/model/gameStats.store.js";

export function useGameStats() {
    return useGameStatsStore();
}