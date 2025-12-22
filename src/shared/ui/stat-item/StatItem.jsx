import styles from './StatItem.module.css';

export function StatItem({ label, value, className = '' }) {
    return (
        <div className={`${styles.item} ${className}`}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}