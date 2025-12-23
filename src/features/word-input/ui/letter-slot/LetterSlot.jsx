import styles from './LetterSlot.module.css';
import {cn} from "@shared/lib/cn.js";

export function LetterSlot({letter, index, isSelected, onClick}) {
    const handleClick = () => {
        onClick?.(index);
    };

    return (
        <button
            type="button"
            className={cn(styles.slot, isSelected ? styles.selected : '', letter ? styles.filled : '')}
            onClick={handleClick}
        >
            {letter || '_'}
        </button>
    );
}