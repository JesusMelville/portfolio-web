import React, { useState, useEffect } from 'react';
import { Button, ThemeToggle, Icon } from '../../atoms';
import { useScrollSpy } from '../../../hooks';
import styles from './Navbar.module.css';

export function Navbar({ theme, toggleTheme }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'inicio', label: 'Inicio' },
        { id: 'sobre-mi', label: 'Sobre Mí' },
        { id: 'proyectos', label: 'Proyectos' },
        { id: 'certificaciones', label: 'Certificaciones' },
        { id: 'habilidades', label: 'Habilidades' },
        { id: 'contacto', label: 'Contacto' }
    ];

    const activeSection = useScrollSpy(navItems.map(item => item.id), 120);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navbarContainer}`}>
                <a href="#inicio" className={styles.logo} onClick={closeMenu}>
                    <span className={styles.logoIcon}>JM</span>
                    <span className={styles.logoText}>Jesus<span className={styles.logoAccent}>Melville</span></span>
                </a>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav} aria-label="Navegación principal">
                    <ul className={styles.navList}>
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                    >
                                        {item.label}
                                        {isActive && <span className={styles.activeDot} />}
                                    </a>
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
                        href="#contacto"
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
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                                        onClick={closeMenu}
                                    >
                                        <span>{item.label}</span>
                                        <Icon name="chevron-right" size={18} />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles.mobileActions}>
                        <Button
                            variant="primary"
                            size="md"
                            href="#contacto"
                            onClick={closeMenu}
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
