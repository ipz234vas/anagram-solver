import styles from './GamePage.module.css';
import { GameStatsBar } from "@features/game-session";
import { GameActions } from "@features/game-controls";
import { WordInputField } from "@features/word-input";
import { LetterTiles } from "@features/letter-selection";
import { GameTimer } from "@features/timer";
import { Button, Modal } from "@shared/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWords } from "@features/words";
import { ResultPage } from "@pages/result-page/ResultPage.jsx";

import {
    useGameRound,
    useGameStats,
    useHintLogic,
    useWordInput,
    useGameControls
} from "@features/game-flow";

import { checkWordCompletion } from "@shared/utils";
import { useGameSettings } from "@features/game-settings/index.js";

export function GamePage({ onGameEnd, onGoHome }) {
    const { settings } = useGameSettings();
    const [showResults, setShowResults] = useState(false);
    const [gameResult, setGameResult] = useState(null);

    const timerRef = useRef(null);
    const timerStartedRef = useRef(false);

    const gameFilters = {
        categories: [settings.category],
        minLength: [settings.minWordLength],
        maxLength: [settings.maxWordLength],
    };

    const { filteredWords, isLoading, error } = useWords(gameFilters);

    const {
        score,
        wordsCompleted,
        wordsSkipped,
        addScore,
        subtractScore,
        incrementWordsCompleted,
        incrementWordsSkipped
    } = useGameStats();

    const {
        roundState,
        startNewRound,
        updateRoundState
    } = useGameRound(filteredWords);

    const { toggleHintMode, applyHintAtIndex, canUseHint, hintPenalty } = useHintLogic(
        roundState,
        updateRoundState,
        score,
        subtractScore
    );

    const { handleSlotClick, handleCursorClick, handleLetterClick } = useWordInput(
        roundState,
        updateRoundState,
        applyHintAtIndex
    );

    const handleGameEnd = useCallback(() => {
        const totalTime = settings.timeSeconds ?? 60;
        const timeLeft = timerRef.current?.timeLeft ?? 0;
        const elapsedSeconds = Math.max(0, totalTime - timeLeft);

        const result = {
            timeSeconds: elapsedSeconds,
            score: score,
            wordsGuessed: wordsCompleted,
            wordsSkipped: wordsSkipped,
            coefficient: elapsedSeconds > 0
                ? Number(((score / elapsedSeconds) * 60).toFixed(2))
                : 0,
        };

        setGameResult(result);
        setShowResults(true);
    }, [settings.timeSeconds, score, wordsCompleted, wordsSkipped]);

    const { handleShuffle, handleSkipWord, handleEndGame, skipPenalty } = useGameControls(
        roundState,
        updateRoundState,
        startNewRound,
        subtractScore,
        incrementWordsSkipped,
        handleGameEnd,
        timerRef
    );

    useEffect(() => {
        if (roundState && !isLoading && !timerStartedRef.current) {
            timerStartedRef.current = true;
            const timer = setTimeout(() => {
                timerRef.current?.start();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [roundState, isLoading]);

    useEffect(() => {
        if (!roundState) return;

        const { isComplete, isCorrect } = checkWordCompletion(
            roundState.currentWord,
            roundState.targetWord
        );

        if (isComplete && isCorrect) {
            const wordScore = roundState.currentWordScore;

            addScore(wordScore);
            incrementWordsCompleted();

            setTimeout(() => {
                startNewRound();
            }, 500);
        }
    }, [
        roundState?.currentWord,
        roundState?.targetWord,
        roundState?.currentWordScore,
        addScore,
        incrementWordsCompleted,
        startNewRound
    ]);

    const handleTimeOver = useCallback(() => {
        handleGameEnd();
    }, [handleGameEnd]);

    const handleLetterTileClick = useCallback((index) => {
        if (roundState?.availableLetters?.[index]) {
            handleLetterClick(roundState.availableLetters[index]);
        }
    }, [roundState, handleLetterClick]);

    const handlePlayAgain = useCallback(() => {
        setShowResults(false);
        setGameResult(null);
        onGameEnd?.();
    }, [onGameEnd]);

    const handleGoHome = useCallback(() => {
        onGoHome?.();
    }, [onGoHome]);

    if (isLoading) {
        return (
            <div className={styles.root}>
                <div className={styles.loadingState}>
                    <p>Завантаження слів...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.root}>
                <div className={styles.errorState}>
                    <p>Помилка завантаження: {error}</p>
                    <Button onClick={() => window.location.reload()}>
                        Спробувати знову
                    </Button>
                </div>
            </div>
        );
    }

    if (!roundState || filteredWords.length === 0) {
        return (
            <div className={styles.root}>
                <div className={styles.errorState}>
                    <p>Не знайдено слів для гри</p>
                </div>
            </div>
        );
    }

    const { isWrong: isInvalid } = checkWordCompletion(
        roundState.currentWord,
        roundState.targetWord
    );

    const currentWordChars = roundState.currentWord.map(letter => letter?.char || '');
    const availableLetterChars = roundState.availableLetters.map(letter => letter.char);

    const actualUsedLetterIds = new Set();
    roundState.currentWord.forEach(letter => {
        if (letter) {
            actualUsedLetterIds.add(letter.id);
        }
    });

    const disabledIndices = roundState.availableLetters
        .map((letter, index) => actualUsedLetterIds.has(letter.id) ? index : -1)
        .filter(index => index !== -1);

    return (
        <div className={styles.root}>
            <GameStatsBar
                score={score}
                wordsCompleted={wordsCompleted}
                wordsSkipped={wordsSkipped}
                timerSlot={
                    <GameTimer
                        ref={timerRef}
                        duration={settings.timeSeconds}
                        warningAt={30}
                        dangerAt={10}
                        onTimeOver={handleTimeOver}
                    />
                }
            />

            <div className={styles.gameArea}>
                <GameActions
                    onHint={toggleHintMode}
                    onShuffle={handleShuffle}
                    hintDisabled={!canUseHint}
                    hintCost={hintPenalty}
                />

                <WordInputField
                    letters={currentWordChars}
                    wordLength={roundState.targetWord.length}
                    selectedSlotIndex={roundState.selectedSlotIndex}
                    selectedCursorIndex={roundState.selectedCursorIndex}
                    correctWord={roundState.targetWord}
                    hintMode={roundState.hintMode}
                    isInvalid={isInvalid}
                    onSlotClick={handleSlotClick}
                    onCursorClick={handleCursorClick}
                />

                <div className={styles.wordInfo}>
                    <div className={styles.category}>
                        Категорія: <strong>{roundState.category}</strong>
                    </div>
                    <div className={styles.wordScore}>
                        Бали за слово: <strong>{roundState.currentWordScore}</strong>
                    </div>
                </div>

                <LetterTiles
                    letters={availableLetterChars}
                    disabledIndices={disabledIndices}
                    onLetterClick={handleLetterTileClick}
                />

                <div className={styles.footer}>
                    <Button
                        variant="secondary"
                        onClick={handleSkipWord}
                        size={'large'}
                    >
                        Пропустити слово (-{skipPenalty})
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleEndGame}
                        size={'large'}
                    >
                        Завершити гру
                    </Button>
                </div>
            </div>

            <Modal
                isOpen={showResults}
                onClose={handleGoHome}
                title="Результати гри"
                hasBackdropBlur={true}
                showCloseButton={false}
            >
                {gameResult && (
                    <ResultPage
                        gameResult={gameResult}
                        onGoHome={handleGoHome}
                        onPlayAgain={handlePlayAgain}
                    />
                )}
            </Modal>
        </div>
    );
}