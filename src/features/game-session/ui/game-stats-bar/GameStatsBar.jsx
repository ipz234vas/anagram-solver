import styles from './GameStatsBar.module.css';
import { Card } from "@shared/ui/index.js";

export function GameStatsBar({ score, wordsCompleted, wordsSkipped, timerSlot }) {

    return (
        <div className={styles.root}>
            <Card className={styles.stat}>
                <div className={styles.value}>Бали: {score}</div>
            </Card>

            <Card className={styles.stat}>
                <div className={styles.label}>Пройдено слів: {wordsCompleted}</div>
                <div className={styles.label}>Пропущено: {wordsSkipped}</div>
            </Card>

            <Card className={styles.stat}>
                {timerSlot}
            </Card>
        </div>
    );
}