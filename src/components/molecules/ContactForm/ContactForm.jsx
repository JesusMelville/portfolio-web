import React, { useState } from 'react';
import { Button, Input, Textarea, Icon } from '../../atoms';
import { useCopyToClipboard } from '../../../hooks';
import styles from './ContactForm.module.css';

export function ContactForm({ recipientEmail }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
    const [generatedLinks, setGeneratedLinks] = useState({ gmailUrl: '', mailtoUrl: '', fullText: '' });
    const { copied, copy } = useCopyToClipboard();

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        const subjectText = formData.subject || `Contacto desde Portafolio - ${formData.name}`;
        const bodyText = `Hola Jesús,\n\nMi nombre es: ${formData.name}\nMi correo de contacto: ${formData.email}\n\nMensaje:\n${formData.message}\n\n---\nEnviado desde tu portafolio web.`;

        const encodedSubject = encodeURIComponent(subjectText);
        const encodedBody = encodeURIComponent(bodyText);

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodedSubject}&body=${encodedBody}`;
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

        setGeneratedLinks({
            gmailUrl,
            mailtoUrl,
            fullText: bodyText
        });

        // Open Gmail Web Composer directly in new tab
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');

        // Also trigger native mailto as a clean background link (without target=_blank to prevent about:blank)
        const mailtoLink = document.createElement('a');
        mailtoLink.href = mailtoUrl;
        mailtoLink.style.display = 'none';
        document.body.appendChild(mailtoLink);
        mailtoLink.click();
        document.body.removeChild(mailtoLink);

        setStatus('success');
    };

    const handleReset = () => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Envíame un mensaje directo</h3>
                <p className={styles.formSubtitle}>Completa los datos y se abrirá tu correo listo para enviar.</p>
            </div>

            {status === 'success' && (
                <div className={styles.successBanner}>
                    <div className={styles.successIcon}>
                        <Icon name="check" size={20} color="var(--color-accent-emerald)" />
                    </div>
                    <div className={styles.successBody}>
                        <h4 className={styles.successTitle}>¡Mensaje preparado con éxito!</h4>
                        <p className={styles.successText}>
                            Se ha generado tu mensaje para <strong>{recipientEmail}</strong>. Si no se abrió automáticamente, selecciona una opción:
                        </p>
                        <div className={styles.successActions}>
                            <a
                                href={generatedLinks.gmailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.actionLink}
                            >
                                <Icon name="gmail" size={16} color="#ea4335" />
                                <span>Abrir en Gmail Web</span>
                            </a>
                            <a
                                href={generatedLinks.mailtoUrl}
                                className={styles.actionLink}
                            >
                                <Icon name="mail" size={16} />
                                <span>Abrir App de Correo</span>
                            </a>
                            <button
                                type="button"
                                className={styles.actionLinkBtn}
                                onClick={() => copy(generatedLinks.fullText)}
                            >
                                <Icon name={copied ? 'check' : 'copy'} size={15} />
                                <span>{copied ? '¡Copiado!' : 'Copiar Mensaje'}</span>
                            </button>
                        </div>
                        <button
                            type="button"
                            className={styles.newMsgBtn}
                            onClick={handleReset}
                        >
                            + Redactar otro mensaje
                        </button>
                    </div>
                </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <Input
                        label="Tu Nombre"
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        required
                    />
                    <Input
                        label="Tu Correo Electrónico"
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="tu@email.com"
                        required
                    />
                </div>

                <Input
                    label="Asunto"
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Ej. Oportunidad laboral / Proyecto Web"
                    required
                />

                <Textarea
                    label="Mensaje"
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Cuéntame sobre tu proyecto, propuesta o consulta técnica..."
                    required
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'sending'}
                    iconRight={<Icon name="send" size={18} />}
                    className={styles.submitBtn}
                >
                    {status === 'sending' ? 'Preparando correo...' : 'Enviar Mensaje Ahora'}
                </Button>
            </form>
        </div>
    );
}
