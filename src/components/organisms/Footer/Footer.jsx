import React from 'react';
import { Icon } from '../../atoms';
import { usePortfolio } from '../../../context';
import styles from './Footer.module.css';

export function Footer() {
    const { profile } = usePortfolio();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.brand}>
                    <span className={styles.logoIcon}>JM</span>
                    <span className={styles.copyright}>
                        &copy; {new Date().getFullYear()} <strong>{profile.name}</strong> • Ingeniero de Sistemas & Full Stack Developer
                    </span>
                </div>

                <div className={styles.socialCol}>
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIconBtn}
                        aria-label="GitHub"
                        title="GitHub"
                    >
                        <Icon name="github" size={16} />
                    </a>
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIconBtn}
                        aria-label="LinkedIn"
                        title="LinkedIn"
                    >
                        <Icon name="linkedin" size={16} />
                    </a>
                    <a
                        href={`mailto:${profile.email}`}
                        className={styles.socialIconBtn}
                        aria-label="Enviar correo"
                        title="Enviar correo"
                    >
                        <Icon name="gmail" size={16} color="#ea4335" />
                    </a>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className={styles.backToTop}
                        aria-label="Volver arriba"
                        title="Volver arriba"
                    >
                        <Icon name="arrow-up" size={15} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
