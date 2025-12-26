import { useLocation, useNavigate } from "react-router";
import { routes } from "@shared/config/routes.js";
import { Button, Card } from "@shared/ui";
import { useState } from "react";
import { usersStorage } from "@features/auth";
import styles from "./LoginPage.module.css";

export function LoginPage() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || routes.startPath;

    const onSubmit = (e) => {
        e.preventDefault();
        const user = usersStorage.loginByName(name);
        if (!user)
            return;

        navigate(from, { replace: true });
    };

    return (
        <div className={styles.root}>
            <Card as="section" className={styles.card}>
                <h1 className={styles.title}>Вхід</h1>
                <p className={styles.subtitle}>Введи ім’я, щоб продовжити.</p>

                <form onSubmit={onSubmit} className={styles.form}>
                    <label className={styles.label}>
                        <span className={styles.labelText}>Імʼя</span>
                        <input
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Напр. Andrii"
                            autoComplete="nickname"
                        />
                    </label>

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        disabled={!name.trim()}
                    >
                        Увійти
                    </Button>
                </form>
            </Card>
        </div>
    );
}