import React, { useEffect } from 'react';
import { ProgressBar, Icon } from '@components/atoms';
import { DashboardModal } from '@components/molecules';
import {
    Navbar,
    Hero,
    About,
    ProjectsSection,
    CertsSection,
    SkillsSection,
    ContactSection,
    Footer
} from '@components/organisms';
import { useTheme } from '@hooks';
import { usePortfolio } from '@context';
import styles from './PortfolioTemplate.module.css';

export function PortfolioTemplate() {
    const { theme, toggleTheme } = useTheme();
    const { currentView, navigateTo, nextView, prevView, navViews } = usePortfolio();

    const currentIndex = navViews.findIndex(v => v.id === currentView);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === navViews.length - 1;

    // Enable ArrowLeft / ArrowRight keyboard navigation between views
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if in input or modal
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
            if (e.key === 'ArrowRight') {
                nextView();
            } else if (e.key === 'ArrowLeft') {
                prevView();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextView, prevView]);

    return (
        <div className={styles.templateWrap}>
            {/* Scroll Progress Indicator */}
            <ProgressBar />

            {/* Ambient Animated Light Orbs */}
            <div className="ambient-background" aria-hidden="true">
                <div className="ambient-orb ambient-orb-1" />
                <div className="ambient-orb ambient-orb-2" />
                <div className="ambient-orb ambient-orb-3" />
            </div>

            {/* Sticky Navigation Header */}
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            {/* Active Full-Screen View Container */}
            <main className={styles.main}>
                <div key={currentView} className={styles.viewContentWrapper}>
                    {currentView === 'inicio' && <Hero />}
                    {currentView === 'sobre-mi' && <About />}
                    {currentView === 'proyectos' && <ProjectsSection />}
                    {currentView === 'certificaciones' && <CertsSection />}
                    {currentView === 'habilidades' && <SkillsSection />}
                    {currentView === 'contacto' && <ContactSection />}
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Interactive Admin Dashboard Modal */}
            <DashboardModal />
        </div>
    );
}
