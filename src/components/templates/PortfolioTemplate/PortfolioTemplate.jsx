import React from 'react';
import { ProgressBar } from '@components/atoms';
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
import styles from './PortfolioTemplate.module.css';

export function PortfolioTemplate() {
    const { theme, toggleTheme } = useTheme();

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

            {/* Main Content Sections */}
            <main className={styles.main}>
                <Hero />
                <About />
                <ProjectsSection />
                <CertsSection />
                <SkillsSection />
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />

            {/* Interactive Admin Dashboard Modal */}
            <DashboardModal />
        </div>
    );
}
