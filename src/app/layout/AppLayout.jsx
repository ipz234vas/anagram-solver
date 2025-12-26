import {Outlet} from "react-router";
import styles from "@app/layout/AppLayout.module.css";
import {NavigationLink} from "@app/layout/NavigationLink.jsx";

export function AppLayout({title, subtitle, navLinks = [], profileLink}) {
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
                        {navLinks.map((l) => (
                            <NavigationLink key={l.to} to={l.to} end={l.end}>
                                {l.label}
                            </NavigationLink>
                        ))}
                    </nav>

                    <div className={styles.actions}>
                        {profileLink ? (
                            <NavigationLink to={profileLink.to} className={styles.profileCta}>
                                {profileLink.label}
                            </NavigationLink>
                        ) : null}
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.container}>
                    <Outlet/>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerLeft}>
                        <span className={styles.footerTitle}>Anagram Solver</span>
                        <span className={styles.footerSep} aria-hidden>•</span>
                        <span className={styles.footerText}>Lab 4</span>
                    </div>

                    <div className={styles.footerRight}>
                        <span className={styles.footerText}>Волинець Андрій ІПЗ-23-4</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}