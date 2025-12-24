import styles from './GameActions.module.css';
import { Lightbulb, Shuffle } from 'lucide-react';

export function GameActions({ onHint, onShuffle, hintDisabled = false, hintCost = 0 }) {
    return (
        <div className={styles.root}>
            <button
                type="button"
                className={`${styles.iconBtn} ${hintDisabled ? styles.disabled : ''}`}
                onClick={onHint}
                aria-label="Підказка"
                disabled={hintDisabled}
                title={hintDisabled ? `Потрібно ${hintCost} балів` : `Підказка (-${hintCost})`}
            >
                <Lightbulb size={28} />
                <span className={styles.cost}>-{hintCost}</span>
            </button>

            <button
                type="button"
                className={styles.iconBtn}
                onClick={onShuffle}
                aria-label="Перемішати"
            >
                <Shuffle size={28} />
            </button>
        </div>
    );
}