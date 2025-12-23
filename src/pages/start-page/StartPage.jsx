import styles from "./StartPage.module.css";
import { Button } from "../../shared/ui";
import { Card } from "../../shared/ui";
import { StatItem } from "../../features/game-stats";

export function StartPage({ settings, onOpenSettings, onStart }) {
    const s = settings || { minWordLength: 4, maxWordLength: 6, timeSeconds: 60 };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Card as="header" className={styles.header}>
                    <h1 className={styles.title}>Анаграми</h1>
                    <p className={styles.description}>
                        Склади слово з перемішаних літер.
                    </p>
                </Card>

                <Card as="section" aria-label="Selected settings">
                    <div className={styles.sectionTitle}>Поточні налаштування</div>

                    <div className={styles.grid}>
                        <StatItem
                            label="Літер у слові"
                            value={`${s.minWordLength}–${s.maxWordLength}`}
                        />
                        <StatItem
                            label="Час"
                            value={`${s.timeSeconds} сек`}
                        />
                    </div>
                </Card>

                <Card as="section" className={styles.actions}>
                    <Button
                        variant="secondary"
                        type="button"
                        size="large"
                        onClick={onOpenSettings}
                    >
                        Налаштувати
                    </Button>

                    <Button
                        variant="primary"
                        type="button"
                        size="large"
                        onClick={onStart}
                    >
                        Старт
                    </Button>
                </Card>
            </div>
        </div>
    );
}