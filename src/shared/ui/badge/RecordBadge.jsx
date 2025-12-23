
import styles from "./RecordBadge.module.css";
import { Trophy } from "lucide-react";

export function RecordBadge() {
    return (
        <div className={styles.badge}>
            <Trophy size={16} className={styles.icon} />
            <span className={styles.text}>Новий рекорд!</span>
        </div>
    );
}
