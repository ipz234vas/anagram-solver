import styles from './Card.module.css';
import {cn} from "@shared/lib/cn.js";

export function Card({children, className = '', as = 'div', ...rest}) {
    const Component = as;

    return (
        <Component className={cn(styles.card, className)} {...rest}>
            {children}
        </Component>
    );
}