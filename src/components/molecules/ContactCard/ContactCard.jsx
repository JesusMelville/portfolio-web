import React from 'react';
import { Button, Icon, Badge } from '../../atoms';
import { useCopyToClipboard } from '../../../hooks';
import styles from './ContactCard.module.css';

export function ContactCard({ email, location, github, linkedin }) {
    const { copied, copy } = useCopyToClipboard();

    const handleCopy = () => {
        copy(email);
    };

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Contacto desde tu Portafolio Web')}`;

    return (
        <div className={styles.contactCard}>
            <div className={styles.cardHeader}>
                <div className={styles.gmailBadge}>
                    <Icon name="gmail" size={24} color="#ea4335" />
                    <span>Gmail Directo</span>
                </div>
                <Badge variant="success" size="sm" dot>
                    Respuesta rápida &lt; 24h
                </Badge>
            </div>

            <div className={styles.emailBox}>
                <span className={styles.emailLabel}>Correo electrónico principal</span>
                <div className={styles.emailValueWrap}>
                    <code className={styles.emailValue}>{email}</code>
                </div>
            </div>

            <div className={styles.actions}>
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleCopy}
                    iconLeft={<Icon name={copied ? 'check' : 'copy'} size={18} />}
                    className={copied ? styles.copiedBtn : ''}
                >
                    {copied ? '¡Copiado al Portapapeles!' : 'Copiar Correo'}
                </Button>

                <Button
                    variant="secondary"
                    size="md"
                    href={gmailWebUrl}
                    target="_blank"
                    iconRight={<Icon name="external-link" size={16} />}
                >
                    Abrir en Gmail
                </Button>
            </div>

            <div className={styles.otherChannels}>
                <span className={styles.channelsTitle}>Otras formas de conectar</span>
                <div className={styles.socialButtons}>
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            title="Perfil de GitHub"
                        >
                            <Icon name="github" size={20} />
                            <span>GitHub</span>
                        </a>
                    )}
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            title="Perfil de LinkedIn"
                        >
                            <Icon name="linkedin" size={20} />
                            <span>LinkedIn</span>
                        </a>
                    )}
                    <a
                        href={`mailto:${email}`}
                        className={styles.socialLink}
                        title="Cliente de Correo por Defecto"
                    >
                        <Icon name="mail" size={20} />
                        <span>Mailto App</span>
                    </a>
                </div>
            </div>

            {location && (
                <div className={styles.locationFooter}>
                    <Icon name="map-pin" size={16} color="var(--text-accent)" />
                    <span>Ubicación: Perú 🇵🇪 (Disponible para trabajo Remoto e Híbrido global)</span>
                </div>
            )}
        </div>
    );
}
