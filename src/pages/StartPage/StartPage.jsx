import styles from "./StartPage.module.css";
import { Button } from "../../shared/ui";

export function StartPage({ settings, onOpenSettings, onStart }) {
    const s = settings || { minWordLength: 4, maxWordLength: 6, timeSeconds: 60 };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Анаграми</h1>
                    <p className={styles.description}>
                        Склади слово з перемішаних літер.
                    </p>
                </header>

                <section className={styles.section} aria-label="Selected settings">
                    <div className={styles.sectionTitle}>Поточні налаштування</div>

                    <div className={styles.grid}>
                        <div className={styles.item}>
                            <div className={styles.label}>Літер у слові</div>
                            <div className={styles.value}>
                                {s.minWordLength}–{s.maxWordLength}
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.label}>Час</div>
                            <div className={styles.value}>{s.timeSeconds} сек</div>
                        </div>
                    </div>
                </section>

                <section className={styles.actions}>
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
                </section>
            </div>
        </div>
    );
}