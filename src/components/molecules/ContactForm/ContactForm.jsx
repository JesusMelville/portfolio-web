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
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate sending and generate mailto link fallback
        setTimeout(() => {
            setStatus('success');
            const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(formData.subject || 'Mensaje de ' + formData.name)}&body=${encodeURIComponent(`Hola Jesus,\n\nMi nombre es: ${formData.name}\nMi email es: ${formData.email}\n\nMensaje:\n${formData.message}`)}`;
            
            // Try to open mailto in background
            const win = window.open(mailtoUrl, '_blank');
            if (win) win.focus();

            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, 6000);
        }, 800);
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Envíame un mensaje directo</h3>
                <p className={styles.formSubtitle}>Completa el formulario y te responderé a la brevedad.</p>
            </div>

            {status === 'success' && (
                <div className={styles.successBanner}>
                    <div className={styles.successIcon}>
                        <Icon name="check" size={20} color="var(--color-accent-emerald)" />
                    </div>
                    <div>
                        <h4 className={styles.successTitle}>¡Mensaje preparado con éxito!</h4>
                        <p className={styles.successText}>
                            Se ha abierto tu cliente de correo para enviar el mensaje directamente a <strong>{recipientEmail}</strong>.
                        </p>
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
                    placeholder="Ej. Propuesta de proyecto / Oportunidad laboral"
                    required
                />

                <Textarea
                    label="Mensaje"
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Cuéntame sobre tu proyecto, objetivos, plazos o cualquier consulta..."
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
                    {status === 'sending' ? 'Procesando mensaje...' : 'Enviar Mensaje Ahora'}
                </Button>
            </form>
        </div>
    );
}
