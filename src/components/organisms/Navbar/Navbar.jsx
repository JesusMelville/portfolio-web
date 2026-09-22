import React, { useState } from 'react';
import { Button, ThemeToggle, Icon } from '../../atoms';
import { usePortfolio } from '../../../context';
import styles from './Navbar.module.css';

export function Navbar({ theme, toggleTheme }) {
    const { currentView, navigateTo, navViews } = usePortfolio();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMenu = () => setMobileMenuOpen(false);

    const handleNavClick = (viewId) => {
        navigateTo(viewId);
        closeMenu();
    };

    return (
        <header className={`${styles.header} ${styles.scrolled}`}>
            <div className={`container ${styles.navbarContainer}`}>
                <a
                    href="#inicio"
                    className={styles.logo}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('inicio');
                    }}
                >
                    <span className={styles.logoIcon}>JM</span>
                    <span className={styles.logoText}>Jesus<span className={styles.logoAccent}>Melville</span></span>
                </a>

                {/* Desktop Nav Tabs */}
                <nav className={styles.desktopNav} aria-label="Navegación principal">
                    <ul className={styles.navList}>
                        {navViews.map((item) => {
                            const isActive = currentView === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                        onClick={() => handleNavClick(item.id)}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <span className={styles.navNumber}>{item.number}</span>
                                        <span>{item.label}</span>
                                        {isActive && <span className={styles.activeDot} />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className={styles.navActions}>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleNavClick('contacto')}
                        className={styles.ctaButton}
                    >
                        Hablemos
                    </Button>

                    <button
                        type="button"
                        className={styles.mobileMenuToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
                <nav className={styles.mobileNav}>
                    <ul className={styles.mobileNavList}>
                        {navViews.map((item) => {
                            const isActive = currentView === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                                        onClick={() => handleNavClick(item.id)}
                                    >
                                        <span className={styles.mobileItemLabel}>
                                            <span className={styles.navNumber}>{item.number}.</span>
                                            <span>{item.label}</span>
                                        </span>
                                        <Icon name="chevron-right" size={18} />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles.mobileActions}>
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => handleNavClick('contacto')}
                            className={styles.mobileCta}
                        >
                            Contáctame por Gmail
                        </Button>
                    </div>
                </nav>
            </div>
            {mobileMenuOpen && <div className={styles.backdrop} onClick={closeMenu} />}
        </header>
    );
}
