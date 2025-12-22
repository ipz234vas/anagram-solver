import styles from './Card.module.css';

export function Card({ children, className = '', as = 'div', ...rest }) {
    const Component = as;

    return (
        <Component className={`${styles.card} ${className}`} {...rest}>
            {children}
        </Component>
    );
}