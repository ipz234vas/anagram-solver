import styles from './CursorSlot.module.css';
import {cn} from "@shared/lib/cn.js";

export function CursorSlot({index, isActive, onClick}) {
    const handleClick = () => {
        onClick?.(index);
    };

    return (
        <button
            type="button"
            className={cn(styles.cursor, isActive ? styles.active : '')}
            onClick={handleClick}
            aria-label={`Insert position ${index}`}
        >
            <div className={styles.indicator}/>
        </button>
    );
}