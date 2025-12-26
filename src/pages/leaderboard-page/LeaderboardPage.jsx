import { useMemo } from "react";
import { useNavigate } from "react-router";
import { routes } from "@shared/config/routes.js";
import { Card } from "@shared/ui";
import styles from "./LeaderboardPage.module.css";
import {usersStorage} from "@features/auth";

const fmt2 = (n) => (Number.isFinite(Number(n)) ? Number(n).toFixed(2) : "0.00");

export function LeaderboardPage() {
    const navigate = useNavigate();

    const { users = [], currentUserId } = useMemo(() => usersStorage.load(), []);

    const rows = useMemo(() => {
        return [...users]
            .map((u) => ({
                id: u.id,
                name: u.name,
                best: u.stats?.bestSuccessRate ?? 0,
            }))
            .sort((a, b) => Number(b.best) - Number(a.best));
    }, [users]);

    return (
        <div className={styles.root}>
            <Card as="header" className={styles.header}>
                <div>
                    <h1 className={styles.title}>Таблиця лідерів</h1>
                    <p className={styles.subtitle}>
                        Сортування за найкращим коефіцієнтом (спадання)
                    </p>
                </div>

                <div className={styles.meta}>
                    Усього гравців: <strong>{rows.length}</strong>
                </div>
            </Card>

            <Card as="section" className={styles.tableCard} aria-label="Leaderboard table">
                <div className={styles.table}>
                    <div className={`${styles.row} ${styles.head}`}>
                        <div>#</div>
                        <div>Імʼя</div>
                        <div className={styles.right}>Коефіцієнт</div>
                    </div>

                    {rows.length === 0 ? (
                        <div className={styles.empty}>
                            Немає даних. Зіграй хоча б одну сесію 🙂
                        </div>
                    ) : (
                        rows.map((r, idx) => {
                            const isMe = Number(r.id) === Number(currentUserId);

                            return (
                                <button
                                    key={r.id}
                                    type="button"
                                    className={`${styles.row} ${styles.bodyRow} ${isMe ? styles.me : ""}`}
                                    onClick={() => navigate(routes.buildUserPath(r.id))}
                                    aria-label={`Відкрити профіль ${r.name}`}
                                >
                                    <div className={styles.rank}>{idx + 1}</div>

                                    <div className={styles.nameCell}>
                                        <span className={styles.name}>{r.name}</span>
                                        {isMe ? <span className={styles.meBadge}>це ти</span> : null}
                                    </div>

                                    <div className={`${styles.right} ${styles.value}`}>
                                        {fmt2(r.best)}%
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </Card>
        </div>
    );
}
