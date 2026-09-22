import React from 'react';
import styles from './Button.module.css';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    target,
    rel,
    onClick,
    iconLeft,
    iconRight,
    disabled = false,
    className = '',
    type = 'button',
    ...rest
}) {
    const buttonClass = `${styles.btn} ${styles[variant] || styles.primary} ${styles[size] || styles.md} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
                className={buttonClass}
                onClick={onClick}
                {...rest}
            >
                {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
                <span className={styles.label}>{children}</span>
                {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
            <span className={styles.label}>{children}</span>
            {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        </button>
    );
}
