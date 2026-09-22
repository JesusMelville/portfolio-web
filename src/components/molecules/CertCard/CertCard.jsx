import React from 'react';
import { Badge, Button, Icon } from '../../atoms';
import styles from './CertCard.module.css';

export function CertCard({ cert }) {
    return (
        <article className={styles.certCard} style={{ '--badge-color': cert.badgeColor || 'var(--color-primary)' }}>
            <div className={styles.header}>
                <div className={styles.iconBadge}>
                    <Icon name="award" size={24} color={cert.badgeColor || 'var(--color-primary)'} />
                </div>
                <div className={styles.meta}>
                    <span className={styles.issuer}>{cert.issuer}</span>
                    <span className={styles.date}>{cert.date}</span>
                </div>
            </div>

            <div className={styles.body}>
                <h3 className={styles.title}>{cert.title}</h3>
                <p className={styles.description}>{cert.description}</p>
            </div>

            <div className={styles.skillsSection}>
                <span className={styles.skillsLabel}>Competencias avaladas:</span>
                <div className={styles.skillsList}>
                    {cert.skills.map((skill) => (
                        <span key={skill} className={styles.skillTag}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.credentialWrap}>
                    <span className={styles.credLabel}>ID de Credencial:</span>
                    <code className={styles.credId}>{cert.credentialId}</code>
                </div>

                {cert.url && (
                    <Button
                        variant="secondary"
                        size="sm"
                        href={cert.url}
                        target="_blank"
                        iconRight={<Icon name="external-link" size={14} />}
                        className={styles.verifyBtn}
                    >
                        Ver Credencial
                    </Button>
                )}
            </div>
        </article>
    );
}
