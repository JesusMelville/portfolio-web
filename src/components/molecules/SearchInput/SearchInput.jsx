import React from 'react';
import { Icon } from '../../atoms';
import styles from './SearchInput.module.css';

export function SearchInput({ value, onChange, onClear, placeholder = 'Buscar por tecnología, nombre...', className = '' }) {
    return (
        <div className={`${styles.searchWrapper} ${className}`}>
            <span className={styles.searchIcon}>
                <Icon name="search" size={18} />
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={styles.searchInput}
            />
            {value && (
                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => {
                        if (onClear) onClear();
                        else onChange('');
                    }}
                    aria-label="Limpiar búsqueda"
                >
                    <Icon name="x" size={16} />
                </button>
            )}
        </div>
    );
}
