import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds = [], offset = 120) {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || 'inicio');

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY + offset;

                    for (let i = sectionIds.length - 1; i >= 0; i--) {
                        const sectionId = sectionIds[i];
                        const element = document.getElementById(sectionId);
                        if (element) {
                            const top = element.offsetTop;
                            if (scrollPosition >= top) {
                                setActiveSection(prev => prev === sectionId ? prev : sectionId);
                                break;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
}
