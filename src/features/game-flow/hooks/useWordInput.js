import {useCallback} from 'react';
import {
    removeLetterAt,
    placeLetterAt,
    findFirstEmptySlot,
    findNextEmptySlot
} from '@shared/utils/index.js';
import {shiftLettersForInsertion} from '@shared/utils/index.js';

export function useWordInput(roundState, updateRoundState, applyHintAtIndex) {

    const handleSlotClick = useCallback((index) => {
        if (!roundState) return;

        if (roundState.hintMode) {
            const result = applyHintAtIndex(index);
            if (result?.updates) {
                updateRoundState(result.updates);
            } else if (result?.action === 'already_correct' || result?.action === 'not_found') {
                updateRoundState({hintMode: false});
            }
            return;
        }

        if (roundState.currentWord[index]) {
            const {word: newWord, usedLetterIds: newUsedIds} = removeLetterAt(
                roundState.currentWord,
                index,
                roundState.usedLetterIds
            );

            const newWordScore = Math.max(1, roundState.currentWordScore - 1);

            updateRoundState({
                currentWord: newWord,
                usedLetterIds: newUsedIds,
                selectedSlotIndex: index,
                selectedCursorIndex: null,
                currentWordScore: newWordScore,
                removalCount: roundState.removalCount + 1
            });
        } else {
            updateRoundState({
                selectedSlotIndex: index,
                selectedCursorIndex: null
            });
        }
    }, [roundState, updateRoundState, applyHintAtIndex]);

    const handleCursorClick = useCallback((cursorIndex) => {
        if (!roundState) return;

        if (roundState.hintMode) {
            updateRoundState({hintMode: false});
            return;
        }

        updateRoundState({
            selectedCursorIndex: cursorIndex,
            selectedSlotIndex: null
        });
    }, [roundState, updateRoundState]);

    const handleLetterClick = useCallback((letterObj) => {
        if (!roundState) return;

        if (roundState.usedLetterIds.has(letterObj.id)) {
            return;
        }

        if (roundState.hintMode) {
            updateRoundState({hintMode: false});
            return;
        }

        const placement = determinePlacement(roundState, letterObj);
        if (!placement) return;

        updateRoundState(placement);
    }, [roundState, updateRoundState]);

    return {
        handleSlotClick,
        handleCursorClick,
        handleLetterClick
    };
}

function determinePlacement(roundState, letterObj) {
    const {selectedCursorIndex, selectedSlotIndex, currentWord} = roundState;

    let targetIndex;
    let shouldShift = false;

    if (selectedCursorIndex !== null) {
        targetIndex = selectedCursorIndex;
        shouldShift = true;
    } else if (selectedSlotIndex !== null) {
        targetIndex = selectedSlotIndex;
        shouldShift = false;
    } else {
        targetIndex = findFirstEmptySlot(currentWord);
        if (targetIndex === -1) return null;
        shouldShift = false;
    }

    if (targetIndex >= currentWord.length) {
        targetIndex = currentWord.length - 1;
    }

    return shouldShift
        ? placeWithShift(roundState, letterObj, targetIndex)
        : placeWithoutShift(roundState, letterObj, targetIndex);
}

function placeWithShift(roundState, letterObj, targetIndex) {
    const shiftResult = shiftLettersForInsertion(roundState.currentWord, targetIndex);
    if (!shiftResult) return null;

    const {word: newWord, usedLetterIds: newUsedIds} = placeLetterAt(
        shiftResult.newWord,
        shiftResult.targetIndex,
        letterObj,
        shiftResult.usedLetterIds || roundState.usedLetterIds
    );

    const nextCursorIndex = shiftResult.targetIndex < newWord.length - 1
        ? shiftResult.targetIndex + 1
        : null;

    return {
        currentWord: newWord,
        usedLetterIds: newUsedIds,
        selectedSlotIndex: null,
        selectedCursorIndex: nextCursorIndex
    };
}

function placeWithoutShift(roundState, letterObj, targetIndex) {
    const {word: newWord, usedLetterIds: newUsedIds} = placeLetterAt(
        roundState.currentWord,
        targetIndex,
        letterObj,
        roundState.usedLetterIds
    );

    const nextSlotIndex = findNextEmptySlot(newWord, targetIndex);

    return {
        currentWord: newWord,
        usedLetterIds: newUsedIds,
        selectedSlotIndex: nextSlotIndex !== -1 ? nextSlotIndex : null,
        selectedCursorIndex: null
    };
}