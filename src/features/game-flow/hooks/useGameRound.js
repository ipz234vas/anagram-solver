import { useCallback, useEffect } from "react";
import { getRandomWord } from "@features/words/index.js";
import { calculateInitialWordScore, shuffleArray, wordToLetters } from "@shared/utils/index.js";
import {useGameRoundStore} from "@features/game-flow/model/gameRound.store.js";

function createInitialRoundState(availableWords) {
    const wordData = getRandomWord(availableWords);
    if (!wordData) return null;

    const word = wordData.word.toUpperCase();
    const letters = wordToLetters(word);

    return {
        targetWord: word,
        category: wordData.category,
        currentWord: new Array(word.length).fill(null),
        availableLetters: shuffleArray(letters),
        usedLetterIds: new Set(),
        selectedSlotIndex: null,
        selectedCursorIndex: null,
        hintMode: false,
        hintCount: 0,
        currentWordScore: calculateInitialWordScore(word),
        removalCount: 0,
    };
}

export function useGameRound(availableWords) {
    const roundState = useGameRoundStore((s) => s.roundState);
    const needsInit = useGameRoundStore((s) => s.needsInit);
    const setRoundState = useGameRoundStore((s) => s.setRoundState);
    const updateRoundState = useGameRoundStore((s) => s.updateRoundState);
    const resetRound = useGameRoundStore((s) => s.resetRound);

    useEffect(() => {
        if (!needsInit) return;
        if (!availableWords || availableWords.length === 0) return;

        const initial = createInitialRoundState(availableWords);
        setRoundState(initial);
    }, [needsInit, availableWords, setRoundState]);

    const startNewRound = useCallback(() => {
        if (!availableWords || availableWords.length === 0) return null;

        const newState = createInitialRoundState(availableWords);
        setRoundState(newState);
        return newState;
    }, [availableWords, setRoundState]);

    return {
        roundState,
        startNewRound,
        updateRoundState,
        resetRound,
    };
}
