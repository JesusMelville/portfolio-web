import React from 'react';
import styles from './Textarea.module.css';

export function Textarea({
    label,
    id,
    value,
    onChange,
    placeholder,
    rows = 4,
    required = false,
    error,
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
            <div className={`${styles.textareaContainer} ${error ? styles.hasError : ''}`}>
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    required={required}
                    className={styles.textarea}
                    {...rest}
                />
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}
