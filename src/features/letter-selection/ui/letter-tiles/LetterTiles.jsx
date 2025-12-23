import styles from './LetterTiles.module.css';
import {cn} from "@shared/lib/cn.js";

export function LetterTiles({ letters, disabledIndices = [], onLetterClick }) {

    return (
        <div className={styles.root}>
            {letters.map((letter, index) => {
                const isDisabled = disabledIndices.includes(index);

                return (
                    <button
                        key={index}
                        type="button"
                        disabled={isDisabled}
                        className={cn(styles.tile, isDisabled ? styles.disabled : '')}
                        onClick={() => onLetterClick?.(index, letter)}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
}