import React from 'react';
import { Badge, Button, Icon } from '../../atoms';
import styles from './CertCard.module.css';

export function CertCard({ cert, onViewCert }) {
    const certFile = cert.certificateFile || cert.certificateImage;
    const isPdf = certFile && (certFile.startsWith('data:application/pdf') || cert.fileType === 'pdf');

    return (
        <article className={styles.certCard} style={{ '--badge-color': cert.badgeColor || 'var(--color-primary)' }}>
            <div className={styles.header}>
                <div className={styles.iconBadge}>
                    <Icon name={isPdf ? 'pdf' : 'award'} size={24} color={isPdf ? '#ef4444' : (cert.badgeColor || 'var(--color-primary)')} />
                </div>
                <div className={styles.meta}>
                    <span className={styles.issuer}>{cert.issuer}</span>
                    <span className={styles.date}>{cert.date}</span>
                </div>
            </div>

            {certFile && (
                <div className={styles.thumbWrapper} onClick={() => onViewCert && onViewCert(cert)}>
                    {isPdf ? (
                        <div className={styles.pdfCardTile}>
                            <Icon name="pdf" size={32} color="#ef4444" />
                            <span className={styles.pdfTileText}>Documento PDF Adjunto</span>
                        </div>
                    ) : (
                        <img src={certFile} alt={cert.title} className={styles.thumbImg} />
                    )}
                    <span className={styles.thumbOverlay}>
                        <Icon name="eye" size={16} />
                        <span>{isPdf ? 'Abrir PDF' : 'Ver Comprobante'}</span>
                    </span>
                </div>
            )}

            <div className={styles.body}>
                <h3 className={styles.title}>{cert.title}</h3>
                <p className={styles.description}>{cert.description}</p>
            </div>

            <div className={styles.skillsSection}>
                <span className={styles.skillsLabel}>Competencias avaladas:</span>
                <div className={styles.skillsList}>
                    {cert.skills && cert.skills.map((skill) => (
                        <span key={skill} className={styles.skillTag}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.credentialWrap}>
                    <span className={styles.credLabel}>ID de Credencial:</span>
                    <code className={styles.credId}>{cert.credentialId || 'Verificado'}</code>
                </div>

                {certFile ? (
                    <Button
                        variant={isPdf ? 'cyan' : 'primary'}
                        size="sm"
                        onClick={() => onViewCert && onViewCert(cert)}
                        iconLeft={<Icon name={isPdf ? 'pdf' : 'eye'} size={14} />}
                        className={styles.verifyBtn}
                    >
                        {isPdf ? 'Ver PDF' : 'Ver Certificado'}
                    </Button>
                ) : cert.url ? (
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
                ) : null}
            </div>
        </article>
    );
}
