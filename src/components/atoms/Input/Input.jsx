import React from 'react';
import styles from './Input.module.css';

export function Input({
    label,
    id,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    error,
    icon,
    className = '',
    ...rest
}) {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <div className={`${styles.inputContainer} ${error ? styles.hasError : ''}`}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={styles.input}
                    {...rest}
                />
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}
