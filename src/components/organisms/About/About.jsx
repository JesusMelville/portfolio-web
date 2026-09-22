import React from 'react';
import { Badge, Icon } from '../../atoms';
import { profile } from '../../../data';
import styles from './About.module.css';

export function About() {
    return (
        <section className={styles.about} id="sobre-mi">
            <div className={`container ${styles.aboutContainer}`}>
                <div className={styles.sectionHeader}>
                    <Badge variant="primary" size="md">
                        Perfil & Trayectoria
                    </Badge>
                    <h2 className={styles.sectionTitle}>Sobre Mí & Enfoque de Ingeniería</h2>
                    <p className={styles.sectionSubtitle}>
                        Construyendo experiencias digitales donde la precisión técnica se encuentra con un diseño visual impecable.
                    </p>
                </div>

                <div className={styles.contentGrid}>
                    <div className={styles.bioColumn}>
                        {profile.about.paragraphs.map((p, idx) => (
                            <p key={idx} className={styles.paragraph}>
                                {p}
                            </p>
                        ))}

                        <div className={styles.locationBadge}>
                            <Icon name="map-pin" size={18} color="var(--color-primary-light)" />
                            <span>De Perú 🇵🇪 • Abierto a colaboración remota global</span>
                        </div>
                    </div>

                    <div className={styles.highlightsGrid}>
                        {profile.about.highlights.map((h, idx) => (
                            <div key={idx} className={styles.highlightCard}>
                                <div className={styles.highlightHeader}>
                                    <div className={styles.highlightIcon}>
                                        <Icon name={idx === 0 ? 'layers' : idx === 1 ? 'code' : idx === 2 ? 'terminal' : 'sparkles'} size={20} color="var(--color-primary-light)" />
                                    </div>
                                    <h3 className={styles.highlightTitle}>{h.title}</h3>
                                </div>
                                <p className={styles.highlightDesc}>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
