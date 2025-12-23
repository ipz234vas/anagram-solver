import styles from './Timer.module.css';
import {cn} from "../../lib/cn.js";

export function Timer({
                          seconds,
                          variant = 'default',
                          size = 'medium',
                          showLabel = false,
                          label = 'Час',
                          warning = false,
                          danger = false
                      }) {
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getStateClass = () => {
        if (danger) return styles.danger;
        if (warning) return styles.warning;
        return '';
    };

    const classes = cn(styles.timer, styles[variant], styles[size], getStateClass());

    return (
        <div className={classes}>
            {showLabel && <div className={styles.label}>{label}</div>}
            <div className={styles.value}>{formatTime(seconds)}</div>
        </div>
    );
}