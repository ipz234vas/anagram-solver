import styles from "./ResultPage.module.css";
import { Button, Card } from "@shared/ui";
import { StatItem, RecordBadge } from "@features/game-stats";

export function ResultPage({ gameResult, isNewRecord, onPlayAgain, onGoHome }) {
    // gameResult = { timeSeconds, score, wordsGuessed, wordsSkipped, coefficient }
    isNewRecord = true;
    const result = gameResult || {
        timeSeconds: 45,
        score: 32,
        wordsGuessed: 8,
        wordsSkipped: 2,
        coefficient: (32 / 45 * 100).toFixed(2),
    };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Card as="header" className={styles.header}>
                    <h1 className={styles.title}>Гра завершена</h1>
                    <p className={styles.description}>
                        Ось твої результати
                    </p>
                </Card>

                <Card as="section" className={styles.coefficientCard}>
                    {isNewRecord && (
                        <div className={styles.recordBadgeWrapper}>
                            <RecordBadge />
                        </div>
                    )}
                    <div className={styles.coefficientLabel}>Коефіцієнт</div>
                    <div className={styles.coefficientValue}>{result.coefficient}%</div>
                    <p className={styles.coefficientDescription}>
                        Оцінка за швидкість розв'язання
                    </p>
                </Card>

                <Card as="section" aria-label="Detailed statistics">
                    <div className={styles.sectionTitle}>Детальна статистика</div>

                    <div className={styles.grid}>
                        <StatItem
                            label="Час"
                            value={`${result.timeSeconds} сек`}
                        />
                        <StatItem
                            label="Балів"
                            value={result.score}
                        />
                        <StatItem
                            label="Слів відгадано"
                            value={result.wordsGuessed}
                        />
                        <StatItem
                            label="Пропущено слів"
                            value={result.wordsSkipped}
                        />
                    </div>
                </Card>

                <Card as="section" className={styles.actions}>
                    <Button
                        variant="secondary"
                        type="button"
                        size="large"
                        onClick={onGoHome}
                    >
                        На головну
                    </Button>

                    <Button
                        variant="primary"
                        type="button"
                        size="large"
                        onClick={onPlayAgain}
                    >
                        Грати ще раз
                    </Button>
                </Card>
            </div>
        </div>
    );
}