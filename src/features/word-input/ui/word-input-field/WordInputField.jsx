import styles from './WordInputField.module.css';
import { LetterSlot } from '../letter-slot/LetterSlot';
import { CursorSlot } from '../cursor-slot/CursorSlot';

export function WordInputField({
                                   letters,
                                   wordLength,
                                   selectedSlotIndex = null,
                                   selectedCursorIndex = null,
                                   correctWord = null,
                                   hintMode = false,
                                   isInvalid = false,
                                   onSlotClick,
                                   onCursorClick
                               }) {
    const slots = Array.from({ length: wordLength }, (_, i) => letters[i] || '');

    const isLetterCorrect = (index, letter) => {
        return letter && correctWord && correctWord[index] === letter;
    };

    const renderSlots = () => {
        const elements = [];
        const allFilled = slots.every(letter => letter); // Всі слоти заповнені

        elements.push(
            <CursorSlot
                key={`cursor-0`}
                index={0}
                isActive={selectedCursorIndex === 0}
                hintMode={hintMode}
                onClick={onCursorClick}
            />
        );

        slots.forEach((letter, index) => {
            const isCorrect = isLetterCorrect(index, letter);
            const showAsCorrectInHintMode = hintMode && isCorrect;

            const showError = allFilled && isInvalid && letter;

            elements.push(
                <LetterSlot
                    key={`slot-${index}`}
                    letter={letter}
                    index={index}
                    isSelected={selectedSlotIndex === index}
                    hintMode={hintMode && !isCorrect}
                    isError={showError}
                    isCorrect={showAsCorrectInHintMode}
                    onClick={onSlotClick}
                />
            );

            elements.push(
                <CursorSlot
                    key={`cursor-${index + 1}`}
                    index={index + 1}
                    isActive={selectedCursorIndex === index + 1}
                    hintMode={hintMode}
                    onClick={onCursorClick}
                />
            );
        });

        return elements;
    };

    return (
        <div className={styles.root}>
            {renderSlots()}
        </div>
    );
}