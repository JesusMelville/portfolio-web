import React from 'react';
import { Badge, Button, Icon } from '../../atoms';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, onOpenDetails }) {
    const categoryLabels = {
        fullstack: 'Full Stack',
        frontend: 'Frontend & UI',
        tools: 'Herramientas & Extensions',
        productivity: 'Productividad'
    };

    return (
        <article className={styles.card} style={{ '--accent-color': project.color || 'var(--color-primary)' }}>
            <div className={styles.cardGlow} />

            <div className={styles.cardHeader}>
                <div className={styles.badgesWrap}>
                    <Badge variant="primary" size="sm">
                        {categoryLabels[project.category] || project.category}
                    </Badge>
                    {project.featured && (
                        <Badge variant="warning" size="sm" icon={<Icon name="star" size={12} color="#fbbf24" />}>
                            Destacado
                        </Badge>
                    )}
                </div>

                <div className={styles.externalLinks}>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconLink}
                            aria-label={`Ver código de ${project.title} en GitHub`}
                            title="Ver Código Fuente"
                        >
                            <Icon name="github" size={18} />
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconLink}
                            aria-label={`Ver demo en vivo de ${project.title}`}
                            title="Ver Demo / Enlace"
                        >
                            <Icon name="external-link" size={18} />
                        </a>
                    )}
                </div>
            </div>

            <div className={styles.cardBody}>
                <h3 className={styles.title}>{project.title}</h3>
                {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
                <p className={styles.description}>{project.description}</p>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.tags}>
                    {(() => {
                        const tagsList = Array.isArray(project.tags)
                            ? project.tags
                            : (typeof project.tags === 'string' ? project.tags.split(',').map(t => t.trim()).filter(Boolean) : []);
                        return (
                            <>
                                {tagsList.slice(0, 4).map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                                {tagsList.length > 4 && (
                                    <span className={styles.tagMore}>+{tagsList.length - 4}</span>
                                )}
                            </>
                        );
                    })()}
                </div>

                <div className={styles.actionRow}>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onOpenDetails && onOpenDetails(project)}
                        iconRight={<Icon name="chevron-right" size={14} />}
                        className={styles.detailsBtn}
                    >
                        Ver Detalles
                    </Button>
                </div>
            </div>
        </article>
    );
}
