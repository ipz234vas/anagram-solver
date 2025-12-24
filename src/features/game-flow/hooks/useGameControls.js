import { useCallback } from 'react';
import { shuffleArray } from '@shared/utils/index.js';
import { calculateSkipPenalty } from '@shared/utils/index.js';

export function useGameControls(
    roundState,
    updateRoundState,
    startNewRound,
    subtractScore,
    incrementWordsSkipped,
    onGameEnd,
    timerRef
) {

    const handleShuffle = useCallback(() => {
        if (!roundState) return;

        updateRoundState({
            availableLetters: shuffleArray([...roundState.availableLetters])
        });
    }, [roundState, updateRoundState]);

    const handleSkipWord = useCallback(() => {
        if (!roundState) return;

        const penalty = calculateSkipPenalty(roundState.targetWord.length);

        subtractScore(penalty);
        incrementWordsSkipped();
        startNewRound();
    }, [roundState, subtractScore, incrementWordsSkipped, startNewRound]);

    const handleEndGame = useCallback(() => {
        const timeLeft = timerRef.current?.timeLeft || 0;
        const confirmEnd = window.confirm(
            `Ви дійсно хочете завершити гру? Залишилось ${timeLeft} секунд`
        );

        if (confirmEnd) {
            onGameEnd();
        }
    }, [onGameEnd, timerRef]);

    const skipPenalty = roundState
        ? calculateSkipPenalty(roundState.targetWord.length)
        : 0;

    return {
        handleShuffle,
        handleSkipWord,
        handleEndGame,
        skipPenalty
    };
}