import styles from './LetterSlot.module.css';
import {cn} from "@shared/lib/cn.js";

export function LetterSlot({
    letter,
    index,
    isSelected,
    hintMode = false,
    isError = false,
    isCorrect = false,
    onClick
}) {
    const handleClick = () => {
        onClick?.(index);
    };

    return (
        <button
            type="button"
            className={cn(
                styles.slot,
                isSelected && styles.selected,
                letter && styles.filled,
                hintMode && styles.hint,
                isError && styles.error,
                isCorrect && styles.correct
            )}
            onClick={handleClick}
        >
            {letter || '_'}
        </button>
    );
}