import React, { useEffect } from 'react';
import { Button, Icon, Badge } from '../../atoms';
import styles from './CertViewerModal.module.css';

export function CertViewerModal({ cert, isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen || !cert) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, cert, onClose]);

    if (!isOpen || !cert) return null;

    return (
        <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.info}>
                        <Badge variant="primary" size="sm">{cert.issuer}</Badge>
                        <h3 className={styles.title}>{cert.title}</h3>
                        <span className={styles.date}>Emitido en {cert.date} • ID: {cert.credentialId || 'N/A'}</span>
                    </div>
                    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                        <Icon name="close" size={20} />
                    </button>
                </div>

                <div className={styles.body}>
                    {cert.certificateImage ? (
                        <div className={styles.imageContainer}>
                            <img src={cert.certificateImage} alt={cert.title} className={styles.certImage} />
                        </div>
                    ) : (
                        <div className={styles.noImagePlaceholder}>
                            <Icon name="award" size={48} color="var(--color-primary-light)" />
                            <h4>Certificado Oficial Verificado</h4>
                            <p>{cert.description || 'Este certificado fue acreditado y verificado.'}</p>
                            {cert.url && (
                                <Button
                                    variant="primary"
                                    size="md"
                                    href={cert.url}
                                    target="_blank"
                                    iconRight={<Icon name="external-link" size={16} />}
                                >
                                    Abrir en la Plataforma Oficial
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    {cert.url && (
                        <Button
                            variant="secondary"
                            size="sm"
                            href={cert.url}
                            target="_blank"
                            iconRight={<Icon name="external-link" size={14} />}
                        >
                            Verificar enlace oficial
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        Cerrar Visor
                    </Button>
                </div>
            </div>
        </div>
    );
}
