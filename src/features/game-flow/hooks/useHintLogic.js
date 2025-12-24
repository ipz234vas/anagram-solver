import { useCallback } from 'react';
import {calculateHintPenalty, placeLetterAt, swapLetters} from "@shared/utils/index.js";

export function useHintLogic(roundState, updateRoundState, score, subtractScore) {

    const toggleHintMode = useCallback(() => {
        if (!roundState) return;

        const penalty = calculateHintPenalty(roundState.hintCount);
        if (score < penalty) return;

        updateRoundState({ hintMode: !roundState.hintMode });
    }, [roundState, score, updateRoundState]);

    const applyHintAtIndex = useCallback((index) => {
        if (!roundState) return null;

        const correctChar = roundState.targetWord[index];

        if (roundState.currentWord[index]?.char === correctChar) {
            return { action: 'already_correct' };
        }

        const correctLetter = findCorrectLetterInAvailable(
            roundState.availableLetters,
            correctChar,
            roundState.usedLetterIds
        );

        if (correctLetter) {
            return placeCorrectLetter(
                roundState,
                index,
                correctLetter,
                subtractScore
            );
        }

        const swapResult = trySwapCorrectLetter(
            roundState,
            index,
            correctChar,
            subtractScore
        );

        if (swapResult) {
            return swapResult;
        }

        return { action: 'not_found' };
    }, [roundState, subtractScore]);

    const canUseHint = roundState
        ? score >= calculateHintPenalty(roundState.hintCount)
        : false;

    return {
        toggleHintMode,
        applyHintAtIndex,
        canUseHint,
        hintPenalty: roundState ? calculateHintPenalty(roundState.hintCount) : 0
    };
}

function findCorrectLetterInAvailable(availableLetters, correctChar, usedLetterIds) {
    return availableLetters.find(
        letter => letter.char === correctChar && !usedLetterIds.has(letter.id)
    );
}

function placeCorrectLetter(roundState, index, correctLetter, subtractScore) {
    const { word: newWord, usedLetterIds: newUsedIds } = placeLetterAt(
        roundState.currentWord,
        index,
        correctLetter,
        roundState.usedLetterIds
    );

    const penalty = calculateHintPenalty(roundState.hintCount);
    subtractScore(penalty);

    return {
        action: 'placed',
        updates: {
            currentWord: newWord,
            usedLetterIds: newUsedIds,
            hintCount: roundState.hintCount + 1,
            hintMode: false
        }
    };
}

function trySwapCorrectLetter(roundState, targetIndex, correctChar, subtractScore) {
    const usedCorrectLetter = roundState.currentWord.find(
        letter => letter && letter.char === correctChar
    );

    if (!usedCorrectLetter) {
        return null;
    }

    const usedLetterIndex = roundState.currentWord.findIndex(
        letter => letter && letter.id === usedCorrectLetter.id
    );

    if (usedLetterIndex === -1 || usedLetterIndex === targetIndex) {
        return null;
    }

    const newWord = swapLetters(roundState.currentWord, targetIndex, usedLetterIndex);
    const penalty = calculateHintPenalty(roundState.hintCount);
    subtractScore(penalty);

    return {
        action: 'swapped',
        updates: {
            currentWord: newWord,
            hintCount: roundState.hintCount + 1,
            hintMode: false
        }
    };
}