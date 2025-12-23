import styles from './GameActions.module.css';
import { Lightbulb, Shuffle } from 'lucide-react';

export function GameActions({ onHint, onShuffle }) {
    return (
        <div className={styles.root}>
            <button
                type="button"
                className={styles.iconBtn}
                onClick={onHint}
                aria-label="Підказка"
            >
                <Lightbulb size={28} />
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