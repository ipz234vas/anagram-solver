import {useState} from "react";
import styles from "./StartPage.module.css";
import {Button, Card} from "@shared/ui";
import {StatItem} from "@features/game-stats";
import {SettingsModal, useGameSettings} from "@features/game-settings";
import {useNavigate} from "react-router";
import {routes} from "@shared/config/routes.js";

export function StartPage() {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const {settings, updateSettings, isValid} = useGameSettings();

    const handleStart = () => {
        if (isValid()) {
            navigate(routes.gamePath);
        }
    };

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
                            value={
                                settings.minWordLength && settings.maxWordLength
                                    ? `${settings.minWordLength}–${settings.maxWordLength}`
                                    : "Не вибрано"
                            }
                        />
                        <StatItem
                            label="Час"
                            value={
                                settings.timeSeconds
                                    ? `${settings.timeSeconds} сек`
                                    : "Не вибрано"
                            }
                        />
                        <StatItem
                            label="Категорія"
                            value={settings.category || "Не вибрано"}
                        />
                    </div>
                </Card>

                <Card as="section" className={styles.actions}>
                    <Button
                        variant="secondary"
                        type="button"
                        size="large"
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        Налаштувати
                    </Button>

                    <Button
                        variant="primary"
                        type="button"
                        size="large"
                        onClick={handleStart}
                        disabled={!isValid()}
                    >
                        Старт
                    </Button>
                </Card>
            </div>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                settings={settings}
                onSave={updateSettings}
            />
        </div>
    );
}