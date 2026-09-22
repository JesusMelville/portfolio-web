import React, { useEffect } from 'react';
import { Badge, Button, Icon } from '../../atoms';
import styles from './ProjectModal.module.css';

export function ProjectModal({ project, onClose }) {
    useEffect(() => {
        if (!project) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [project, onClose]);

    if (!project) return null;

    return (
        <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                style={{ '--accent-color': project.color || 'var(--color-primary)' }}
            >
                <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Cerrar modal"
                >
                    <Icon name="close" size={20} />
                </button>

                <div className={styles.header}>
                    <div className={styles.badges}>
                        <Badge variant="primary" size="md">
                            {project.category ? project.category.toUpperCase() : 'PROYECTO'}
                        </Badge>
                        {project.featured && (
                            <Badge variant="warning" size="md" icon={<Icon name="star" size={14} color="#fbbf24" />}>
                                Proyecto Destacado
                            </Badge>
                        )}
                    </div>
                    <h2 className={styles.title}>{project.title}</h2>
                    {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Descripción del Proyecto</h4>
                        <p className={styles.paragraph}>{project.longDescription || project.description}</p>
                    </div>

                    {project.features && project.features.length > 0 && (
                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>Características y Soluciones Clave</h4>
                            <ul className={styles.featureList}>
                                {project.features.map((feature, idx) => (
                                    <li key={idx} className={styles.featureItem}>
                                        <span className={styles.featureBullet}>
                                            <Icon name="check" size={14} color="var(--color-accent-emerald)" />
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Stack Tecnológico</h4>
                        <div className={styles.tagsGrid}>
                            {project.tags && project.tags.map((tag) => (
                                <Badge key={tag} variant="default" size="md">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.actionButtons}>
                        {project.github && (
                            <Button
                                variant="outline"
                                size="md"
                                href={project.github}
                                target="_blank"
                                iconLeft={<Icon name="github" size={18} />}
                            >
                                Ver Repositorio
                            </Button>
                        )}
                        {project.demo && (
                            <Button
                                variant="primary"
                                size="md"
                                href={project.demo}
                                target="_blank"
                                iconRight={<Icon name="external-link" size={18} />}
                            >
                                Abrir Proyecto
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
