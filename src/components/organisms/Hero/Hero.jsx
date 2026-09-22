import React, { useState, useEffect } from 'react';
import { Button, Badge, Icon } from '../../atoms';
import { profile } from '../../../data';
import styles from './Hero.module.css';

export function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % profile.subRoles.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.hero} id="inicio">
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.heroText}>
                    <div className={styles.statusBadgeWrap}>
                        <Badge variant="success" size="md" dot>
                            {profile.status.text}
                        </Badge>
                    </div>

                    <div className={styles.introHeading}>
                        <span className={styles.greeting}>Hola, soy</span>
                        <h1 className={styles.name}>{profile.name}</h1>
                        <div className={styles.roleWrap}>
                            <span className={styles.staticRole}>{profile.role}</span>
                            <span className={styles.divider}>•</span>
                            <span className={styles.dynamicRole}>{profile.subRoles[roleIndex]}</span>
                        </div>
                    </div>

                    <p className={styles.bio}>{profile.bio}</p>

                    <div className={styles.actions}>
                        <Button
                            variant="primary"
                            size="lg"
                            href="#proyectos"
                            iconRight={<Icon name="chevron-right" size={18} />}
                        >
                            Ver Proyectos
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            href="#contacto"
                            iconLeft={<Icon name="gmail" size={18} color="#ea4335" />}
                        >
                            Contáctame
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            href={profile.github}
                            target="_blank"
                            iconLeft={<Icon name="github" size={18} />}
                        >
                            GitHub
                        </Button>
                    </div>

                    <div className={styles.statsRow}>
                        {profile.stats.map((stat, idx) => (
                            <div key={idx} className={styles.statItem}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarGlow} />
                        <div className={styles.avatarRing} />
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className={styles.avatar}
                            loading="eager"
                        />
                        <div className={styles.floatingTech}>
                            <span className={styles.techPill}>⚛️ React 18+</span>
                            <span className={styles.techPill}>🔷 TypeScript</span>
                            <span className={styles.techPill}>⚡ Vite</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
