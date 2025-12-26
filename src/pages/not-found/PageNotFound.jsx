import { useNavigate } from "react-router";
import { routes } from "@shared/config/routes.js";
import { Button } from "@shared/ui/button/Button.jsx";
import styles from "./PageNotFound.module.css";

export function PageNotFound() {
    const navigate = useNavigate();

    return (
        <section className={styles.root} aria-labelledby="nf-title">
            <div className={styles.card}>
                <div className={styles.badge} aria-hidden>
                    404
                </div>

                <h1 id="nf-title" className={styles.title}>
                    Сторінку не знайдено
                </h1>

                <p className={styles.text}>
                    Можливо, посилання неправильне або сторінку перемістили. Спробуй повернутись назад або на головну.
                </p>

                <div className={styles.actions}>
                    <Button variant="primary" size={"large"} onClick={() => navigate(routes.startPath, { replace: true })}>
                        На головну
                    </Button>

                    <Button variant="secondary" size={"large"} onClick={() => navigate(-1)}>
                        Назад
                    </Button>
                </div>

                <div className={styles.hint}>
                    <span className={styles.dot} aria-hidden />
                    <span>Перевір URL або обери розділ в меню зверху.</span>
                </div>
            </div>
        </section>
    );
}
