import React, { useState } from 'react';
import { Button, Input, Textarea, Icon } from '../../atoms';
import styles from './ContactForm.module.css';

export function ContactForm({ recipientEmail }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nombre: formData.name,
                    Email: formData.email,
                    Asunto: formData.subject || 'Mensaje desde Portafolio Web',
                    Mensaje: formData.message,
                    _subject: `Nuevo mensaje de ${formData.name} - Portafolio`,
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            const data = await response.json();

            if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error(data.message || 'No se pudo enviar el mensaje.');
            }
        } catch (err) {
            console.error('Error enviando formulario:', err);
            // Even if offline/CORS, we provide friendly fallback
            setStatus('error');
            setErrorMessage('Hubo un inconveniente al enviar directamente. Puedes abrir tu cliente de correo.');
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setErrorMessage('');
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Envíame un mensaje directo</h3>
                <p className={styles.formSubtitle}>Escribe tu consulta y me llegará directamente a mi bandeja de entrada.</p>
            </div>

            {status === 'success' && (
                <div className={styles.successBanner}>
                    <div className={styles.successIcon}>
                        <Icon name="check" size={22} color="var(--color-accent-emerald)" />
                    </div>
                    <div className={styles.successBody}>
                        <h4 className={styles.successTitle}>¡Mensaje enviado con éxito!</h4>
                        <p className={styles.successText}>
                            Gracias por contactarme. He recibido tu mensaje en mi correo y te responderé en menos de 24 horas.
                        </p>
                        <button
                            type="button"
                            className={styles.newMsgBtn}
                            onClick={handleReset}
                        >
                            + Enviar otro mensaje
                        </button>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className={styles.errorBanner}>
                    <div className={styles.errorIcon}>
                        <Icon name="alert-triangle" size={20} color="#fb7185" />
                    </div>
                    <div className={styles.errorBody}>
                        <h4 className={styles.errorTitle}>Aviso de envío</h4>
                        <p className={styles.errorText}>
                            {errorMessage}
                        </p>
                        <div className={styles.errorActions}>
                            <a
                                href={`mailto:${recipientEmail}?subject=${encodeURIComponent(formData.subject || 'Contacto')}&body=${encodeURIComponent(formData.message)}`}
                                className={styles.fallbackBtn}
                            >
                                <Icon name="mail" size={16} />
                                <span>Enviar con mi aplicación de correo</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {status !== 'success' && (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <Input
                            label="Tu Nombre"
                            id="contact-name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Ej. Alexander Smith"
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
                        placeholder="Cuéntame sobre tu proyecto, objetivos o consulta técnica..."
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={status === 'sending'}
                        iconRight={<Icon name="send" size={18} className={status === 'sending' ? styles.spin : ''} />}
                        className={styles.submitBtn}
                    >
                        {status === 'sending' ? 'Enviando mensaje directo...' : 'Enviar Mensaje Directo'}
                    </Button>
                </form>
            )}
        </div>
    );
}
