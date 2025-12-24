import { useState, useCallback } from 'react';

export function useGameStats() {
    const [score, setScore] = useState(0);
    const [wordsCompleted, setWordsCompleted] = useState(0);
    const [wordsSkipped, setWordsSkipped] = useState(0);

    const addScore = useCallback((points) => {
        setScore(prev => prev + points);
    }, []);

    const subtractScore = useCallback((points) => {
        setScore(prev => Math.max(0, prev - points));
    }, []);

    const incrementWordsCompleted = useCallback(() => {
        setWordsCompleted(prev => prev + 1);
    }, []);

    const incrementWordsSkipped = useCallback(() => {
        setWordsSkipped(prev => prev + 1);
    }, []);

    return {
        score,
        wordsCompleted,
        wordsSkipped,
        addScore,
        subtractScore,
        incrementWordsCompleted,
        incrementWordsSkipped
    };
}