import React from 'react';
import { Icon } from '../../atoms';
import { usePortfolio } from '../../../context';
import styles from './Footer.module.css';

export function Footer() {
    const { profile, openDashboard } = usePortfolio();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.topRow}>
                    <div className={styles.brand}>
                        <a href="#inicio" className={styles.logo}>
                            <span className={styles.logoIcon}>JM</span>
                            <span className={styles.logoText}>Jesus<span className={styles.logoAccent}>Melville</span></span>
                        </a>
                        <p className={styles.tagline}>
                            Desarrollador Web Full Stack apasionado por la ingeniería frontend moderna y arquitecturas limpias.
                        </p>
                    </div>

                    <div className={styles.quickLinks}>
                        <span className={styles.linksHeading}>Navegación</span>
                        <ul className={styles.linksList}>
                            <li><a href="#inicio">Inicio</a></li>
                            <li><a href="#sobre-mi">Sobre Mí</a></li>
                            <li><a href="#proyectos">Proyectos</a></li>
                            <li><a href="#certificaciones">Certificaciones</a></li>
                            <li><a href="#habilidades">Habilidades</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                        </ul>
                    </div>

                    <div className={styles.socialCol}>
                        <span className={styles.linksHeading}>Conectar & Gestión</span>
                        <div className={styles.socialIcons}>
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIconBtn}
                                aria-label="GitHub"
                            >
                                <Icon name="github" size={20} />
                            </a>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIconBtn}
                                aria-label="LinkedIn"
                            >
                                <Icon name="linkedin" size={20} />
                            </a>
                            <a
                                href={`mailto:${profile.email}`}
                                className={styles.socialIconBtn}
                                aria-label="Gmail"
                            >
                                <Icon name="gmail" size={20} color="#ea4335" />
                            </a>
                        </div>

                        <button
                            type="button"
                            className={styles.dashFooterBtn}
                            onClick={openDashboard}
                        >
                            <Icon name="settings" size={16} />
                            <span>Panel de Control (Dashboard)</span>
                        </button>
                    </div>
                </div>

                <div className={styles.bottomRow}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} {profile.name}. Todos los derechos reservados. Construido con React 18, Vite y Atomic Design.
                    </p>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className={styles.backToTop}
                        aria-label="Volver al inicio"
                    >
                        <span>Volver arriba</span>
                        <Icon name="arrow-up" size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
