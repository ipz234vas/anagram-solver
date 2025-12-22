import styles from "./AppLayout.module.css";

export function AppLayout({ title, subtitle, children }) {
    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.brand}>
                        <div className={styles.logo} aria-hidden>
                            A
                        </div>
                        <div className={styles.brandText}>
                            <div className={styles.titleRow}>
                                <div className={styles.title}>{title}</div>
                                <span className={styles.version}>v0.1</span>
                            </div>
                            {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
                        </div>
                    </div>

                    <nav className={styles.nav} aria-label="Primary navigation">
                        <button className={`${styles.navItem} ${styles.navActive}`} type="button">
                            Головна
                        </button>
                        <button className={styles.navItem} type="button">
                            Таблиця лідерів
                        </button>
                    </nav>

                    <div className={styles.actions}>
                        <button className={styles.linkBtn} type="button">
                            Профіль
                        </button>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.container}>{children}</div>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerLeft}>
                        <span className={styles.footerTitle}>Anagram Solver</span>
                        <span className={styles.footerSep} aria-hidden>•</span>
                        <span className={styles.footerText}>Lab 1</span>
                    </div>

                    <div className={styles.footerRight}>
                        <span className={styles.footerText}>Волинець Андрій ІПЗ-23-4</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
