import { Link } from "react-router";
import { routes } from "@shared/config/routes.js";
import { Card, Button } from "@shared/ui";
import styles from "./UserPage.module.css";

const fmt = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0);
const fmt2 = (n) => fmt(n).toFixed(2);

export function UserPage({ user, isCurrent, onBack, onLogout }) {
    const stats = user.stats ?? {};

    return (
        <div className={styles.root}>
            <Card as="header" className={styles.header}>
                <div className={styles.headerTop}>
                    <div>
                        <h1 className={styles.title}>Профіль користувача</h1>
                        <p className={styles.subtitle}>Дані зберігаються локально в браузері</p>
                    </div>

                    <div className={styles.badges}>
            <span className={styles.badge}>
              ID: <strong>{user.id}</strong>
            </span>

                        {isCurrent ? (
                            <span className={`${styles.badge} ${styles.badgeActive}`}>Поточний користувач</span>
                        ) : (
                            <span className={styles.badgeMuted}>Не поточний</span>
                        )}
                    </div>
                </div>

                <div className={styles.userRow}>
                    <div className={styles.userAvatar} aria-hidden>
                        {String(user.name ?? "?").trim().slice(0, 1).toUpperCase()}
                    </div>

                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userMeta}>
                            <span>Найкращий коефіцієнт: </span>
                            <strong>{fmt2(stats.bestSuccessRate)}%</strong>
                        </div>
                    </div>

                    <div className={styles.userActions}>
                        <Link className={styles.link} to={routes.leaderboardPath}>
                            До лідерборду →
                        </Link>
                    </div>
                </div>
            </Card>

            <Card as="section" className={styles.stats}>
                <h2 className={styles.sectionTitle}>Статистика</h2>

                <div className={styles.grid}>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Найкращий коефіцієнт</div>
                        <div className={styles.statValue}>{fmt2(stats.bestSuccessRate)}%</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Усього сесій</div>
                        <div className={styles.statValue}>{fmt(stats.totalSessions)}</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Усього балів</div>
                        <div className={styles.statValue}>{fmt(stats.totalScore)}</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Усього часу</div>
                        <div className={styles.statValue}>{fmt(stats.totalTimeSeconds)} сек</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Усього відгаданих слів</div>
                        <div className={styles.statValue}>{fmt(stats.totalWordsSolved)}</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Середній бал/сесія</div>
                        <div className={styles.statValue}>
                            {fmt(stats.totalSessions) > 0
                                ? fmt2(fmt(stats.totalScore) / fmt(stats.totalSessions))
                                : "0.00"}
                        </div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Середній час/сесія</div>
                        <div className={styles.statValue}>
                            {fmt(stats.totalSessions) > 0
                                ? `${fmt2(fmt(stats.totalTimeSeconds) / fmt(stats.totalSessions))} сек`
                                : "0.00 сек"}
                        </div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Середні слова/сесія</div>
                        <div className={styles.statValue}>
                            {fmt(stats.totalSessions) > 0
                                ? fmt2(fmt(stats.totalWordsSolved) / fmt(stats.totalSessions))
                                : "0.00"}
                        </div>
                    </div>
                </div>
            </Card>

            <Card as="section" className={styles.footer}>
                <div className={styles.footerText}>
                    {isCurrent
                        ? "Якщо вийдеш — потрібно буде знову “увійти” по імені."
                        : "Перегляд профілю іншого користувача."}
                </div>

                <div className={styles.footerActions}>
                    <Button variant="secondary" size="large" onClick={onBack}>
                        Назад
                    </Button>

                    {isCurrent ? (
                        <Button variant="danger" size="large" onClick={onLogout}>
                            Вийти
                        </Button>
                    ) : null}
                </div>
            </Card>
        </div>
    );
}