import styles from './Button.module.css';
import {cn} from "@shared/lib/cn.js";

export function Button({
                           children,
                           variant = 'primary',
                           size = 'medium',
                           fullWidth = false,
                           disabled = false,
                           type = 'button',
                           onClick,
                           className = '',
                           ...rest
                       }) {
    const classes = cn(styles.btn, styles[variant], styles[size], fullWidth && styles.fullWidth, className);

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}