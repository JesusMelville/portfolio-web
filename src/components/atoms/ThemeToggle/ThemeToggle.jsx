import React from 'react';
import { Icon } from '../Icon/Icon';
import styles from './ThemeToggle.module.css';

export function ThemeToggle({ theme, toggleTheme, className = '' }) {
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            className={`${styles.toggle} ${className}`}
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
        >
            <span className={`${styles.iconWrap} ${isDark ? styles.showMoon : styles.showSun}`}>
                <Icon name="sun" size={18} className={styles.sunIcon} />
                <Icon name="moon" size={18} className={styles.moonIcon} />
            </span>
        </button>
    );
}
