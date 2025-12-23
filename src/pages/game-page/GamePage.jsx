import styles from './GamePage.module.css';
import {GameStatsBar} from "@features/game-session";
import {GameActions} from "@features/game-controls";
import {WordInputField} from "@features/word-input";
import {LetterTiles} from "@features/letter-selection";
import {GameTimer} from "@features/timer";
import {Button} from "@shared/ui";

export function GamePage({onGameEnd}) {
    const mockScore = 32;
    const mockWordsCompleted = 3;
    const mockWordsSkipped = 2;

    const mockCurrentWord = ['Ч', '', 'А', '', ''];
    const mockAvailableLetters = ['Ч', 'Р', 'К', 'А', 'У'];

    const mockSelectedSlot = 4;
    const mockSelectedCursor = null;
    const mockDisabledIndices = [0, 3];

    const handleSlotClick = (index) => {
        console.log('Slot clicked:', index);
    };

    const handleCursorClick = (index) => {
        console.log('Cursor clicked:', index);
    };

    const handleLetterClick = (index, letter) => {
        console.log('Letter clicked:', index, letter);
    };

    const handleHint = () => {
        console.log('Hint requested');
    };

    const handleShuffle = () => {
        console.log('Shuffle requested');
    };

    const handleSkipWord = () => {
        console.log('Word skipped');
    };

    const handleEndGame = () => {
        const confirmEnd = window.confirm("Ви дійсно хочете завершити гру?");
        if (confirmEnd) {
            onGameEnd();
        }
    }

    return (
        <div className={styles.root}>
            <GameStatsBar
                score={mockScore}
                wordsCompleted={mockWordsCompleted}
                wordsSkipped={mockWordsSkipped}
                timerSlot={<GameTimer
                    ref={null}
                    duration={60}
                    warningAt={30}
                    dangerAt={10}
                    onTimeOver={() => alert('Game Over')}
                />}
            />

            <div className={styles.gameArea}>
                <div className={styles.inputRow}>
                    <GameActions
                        onHint={handleHint}
                        onShuffle={handleShuffle}
                    />

                    <WordInputField
                        letters={mockCurrentWord}
                        wordLength={5}
                        selectedSlotIndex={mockSelectedSlot}
                        selectedCursorIndex={mockSelectedCursor}
                        onSlotClick={handleSlotClick}
                        onCursorClick={handleCursorClick}
                    />
                </div>

                <div className={styles.tilesRow}>
                    <LetterTiles
                        letters={mockAvailableLetters}
                        disabledIndices={mockDisabledIndices}
                        onLetterClick={handleLetterClick}
                    />
                </div>

                <div className={styles.footer}>
                    <Button
                        variant="secondary"
                        onClick={handleSkipWord}
                        size={'large'}
                    >
                        Пропустити слово
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
        </div>
    );
}