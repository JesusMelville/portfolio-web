import React from 'react';
import styles from './FilterTabs.module.css';

export function FilterTabs({ categories = [], activeCategory, onSelectCategory, counts = {} }) {
    return (
        <div className={styles.tabsContainer} role="tablist">
            {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const count = counts[category.id];

                return (
                    <button
                        key={category.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`${styles.tab} ${isActive ? styles.active : ''}`}
                        onClick={() => onSelectCategory(category.id)}
                    >
                        <span>{category.label}</span>
                        {count !== undefined && (
                            <span className={`${styles.count} ${isActive ? styles.countActive : ''}`}>
                                {count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
