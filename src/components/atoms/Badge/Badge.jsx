import React from 'react';
import styles from './Badge.module.css';

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    icon,
    dot = false,
    className = '',
    style = {},
    ...rest
}) {
    return (
        <span
            className={`${styles.badge} ${styles[variant] || styles.default} ${styles[size] || styles.sm} ${className}`}
            style={style}
            {...rest}
        >
            {dot && <span className={styles.dot} />}
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{children}</span>
        </span>
    );
}
