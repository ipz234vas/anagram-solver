import { useState, useCallback, useEffect, useRef } from 'react';
import { getRandomWord } from '@features/words/index.js';
import {calculateInitialWordScore, shuffleArray, wordToLetters} from "@shared/utils/index.js";

function createInitialRoundState(availableWords) {
    const wordData = getRandomWord(availableWords);

    if (!wordData) {
        return null;
    }

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
        removalCount: 0
    };
}

export function useGameRound(availableWords) {
    const initializedRef = useRef(false);
    const [roundState, setRoundState] = useState(null);

    useEffect(() => {
        if (availableWords && availableWords.length > 0 && !initializedRef.current) {
            initializedRef.current = true;
            const initialState = createInitialRoundState(availableWords);
            setRoundState(initialState);
        }
    }, [availableWords]);

    const startNewRound = useCallback(() => {
        if (!availableWords || availableWords.length === 0) {
            return null;
        }

        const newState = createInitialRoundState(availableWords);
        if (newState) {
            setRoundState(newState);
        }
        return newState;
    }, [availableWords]);

    const updateRoundState = useCallback((updates) => {
        setRoundState(prev => {
            if (!prev) return prev;

            const newUpdates = typeof updates === 'function'
                ? updates(prev)
                : updates;

            return { ...prev, ...newUpdates };
        });
    }, []);

    return {
        roundState,
        startNewRound,
        updateRoundState
    };
}