import React, { useEffect, useRef } from 'react';
import styles from './ProgressBar.module.css';

export function ProgressBar() {
    const barRef = useRef(null);

    useEffect(() => {
        let ticking = false;

        const updateScrollProgress = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (barRef.current) {
                        const currentScroll = window.scrollY;
                        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                        const progress = scrollHeight > 0 ? Math.min(Math.max(currentScroll / scrollHeight, 0), 1) : 0;
                        barRef.current.style.transform = `scaleX(${progress})`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        updateScrollProgress();

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <div className={styles.progressTrack} aria-hidden="true">
            <div
                ref={barRef}
                className={styles.progressBar}
                style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
            />
        </div>
    );
}
