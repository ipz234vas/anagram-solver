import styles from './StatItem.module.css';
import {cn} from "../../lib/cn.js";

export function StatItem({ label, value, className = '' }) {
    return (
        <div className={cn(styles.item, className)}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}