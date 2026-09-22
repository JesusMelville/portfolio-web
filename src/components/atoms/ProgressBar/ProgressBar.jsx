import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

export function ProgressBar() {
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setScrollPercent(Number((currentScroll / scrollHeight).toFixed(4)) * 100);
            }
        };

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <div className={styles.progressTrack} aria-hidden="true">
            <div
                className={styles.progressBar}
                style={{ width: `${scrollPercent}%` }}
            />
        </div>
    );
}
